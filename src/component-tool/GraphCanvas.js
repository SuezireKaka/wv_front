import { useState, useRef, useMemo, useEffect, useContext } from 'react';
import ToolContext from './ToolContextProvider';
import AppContext from 'context/AppContextProvider';
import Remocon from '../toolbox/Remocon';
import UseGestureElement from '../toolbox/UseGestureElement';
import { useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import { isAnyDanger } from './PropAccordion';
import { X_MAX_TOOLSIZE, X_MIN_TOOLSIZE, Y_MAX_TOOLSIZE, Y_MIN_TOOLSIZE } from './ToolManager';
import Tracker, { TRACKER_SIZE } from 'toolbox/Tracker';

export const [DEFAULT_VERTEX_X_SIZE, DEFAULT_VERTEX_Y_SIZE,
    DEFAULT_EDGE_X_SIZE, DEFAULT_EDGE_Y_SIZE]
    = [100, 100, 50, 50]

export const [X_MIN_OBJSIZE, Y_MIN_OBJSIZE,
    X_MAX_OBJSIZE, Y_MAX_OBJSIZE]
    = [50, 30, 200, 100]

export const [DEFAULT_LOOP_X_DIST, DEFAULT_LOOP_Y_DIST] = [150, 150]

export default function GraphCanvas() {
    const {
        initVertices, setInitVertices,
        nowVertices, setNowVertices,
        initEdges, setInitEdges,
        nowEdges, setNowEdges,
        xToolSize, setXToolSize,
        yToolSize, setYToolSize,
        initXToolSize, setInitXToolSize,
        initYToolSize, setInitYToolSize,
        nowObjectList,
        onSummonObject, onDeleteAllObjects,
        onSaveTool
    } = useContext(ToolContext);

    const { auth } = useContext(AppContext);

    const location = useLocation();
    const state = location.state;
    const writer = state?.writer;

    console.log("작가 들어있는 상태 보여줘", state)
    console.log("그래서 이제 뭐 그려?", nowVertices, nowEdges)

    const canvasRef = useRef()

    const [nowFunc, setNowFunc] = useState(0)
    const [nowFuncName, setNowFuncName] = useState("선택")
    // 위에는 id랑, 아래는 이름이랑 엮기 - 복붙시 위에만 증가
    const [realSummonedCnt, setRealSummonedCnt] = useState(0)
    const [summonedCnt, setSummonedCnt] = useState(0)

    const [selectedId, setSelectedId] = useState()

    // 재귀함수로 삭제할 때 이미 삭제할 것으로 정해진 애들을 기억해서 무시할 수 있도록 하는 용도
    const [memo, setMemo] = useState([])

    function onSelect(index, name) {
        setNowFunc(index)
        setNowFuncName(name)
        setSelectedId()
    }

    function findCenterOf(selectedId) {
        let selected = findById(selectedId)
        if (selected) {
            return center(selected.xPos, selected.yPos, selected.xSize, selected.ySize)
        }
        else {
            return null
        }
    }

    function findById(selectedId) {
        let filteredArray = [...nowVertices, ...nowEdges].filter(obj => obj.id === selectedId)
        console.log("이 어레이는 뭐야?", filteredArray)
        if (filteredArray && filteredArray.length > 0) {
            let selected = filteredArray[0]
            return selected
        }
        else {
            return null
        }
    }

    function center(xPos, yPos, xSize, ySize) {
        // x축은 3.3배정도, y축은 5.1배 정도 길이 but why?
        let result = [xPos + xSize / 2, yPos + ySize / 2]
        console.log("여기가 지금 중점이라며?", ...result)
        return result
    }

    function redraw() {
        let ctx = canvasRef.current?.getContext("2d")

        ctx?.reset()
        ctx?.beginPath()
        console.log("nowEdges에 무슨 일이야?", nowEdges)
        nowEdges.forEach((relation) => {
            console.log("지금부터 이거 그릴게요", relation)
            let oneId = relation?.one.id
            let otherId = relation?.other.id
            // edge의 양 끝 대상의 id가 같다면 원 그리기
            if (oneId === otherId) {
                drawCircle(ctx,
                    findCenterOf(relation.one.id),
                    center(relation.xPos, relation.yPos, relation.xSize, relation.ySize)
                )
            } // 다르다면 2차 베지에 그리기
            else {
                drawQuadraticCurve(ctx,
                    findCenterOf(relation.one.id),
                    findCenterOf(relation.other.id),
                    center(relation.xPos, relation.yPos, relation.xSize, relation.ySize)
                )
            }
        })
        ctx?.stroke();
    }

    function drawCircle(ctx, [oneCenterX, oneCenterY], [fartherX, fartherY]) {
        //원의 중점과 반지름을 이용
        console.log("뭐가 온 거야?", oneCenterX, oneCenterY, fartherX, fartherY)
        let [circleCenterX, circleCenterY] = [(oneCenterX + fartherX) / 2, (oneCenterY + fartherY) / 2]
        let radius = Math.sqrt((oneCenterX - circleCenterX) ** 2 + (oneCenterY - circleCenterY) ** 2)
        console.log("반지름 줘 봐", radius)
        // 라디안은 전설이다......
        ctx?.moveTo(circleCenterX + radius, circleCenterY)
        ctx?.arc(circleCenterX, circleCenterY, radius, 0, (360 * Math.PI) / 180, true)
    }

    function drawQuadraticCurve(ctx, [oneCenterX, oneCenterY], [otherCenterX, otherCenterY], [fartherX, fartherY]) {
        // 베지에 커브를 미분해서 역으로 풀면 이렇게 나옴
        let [controlX, controlY] =
            [2 * fartherX - (oneCenterX + otherCenterX) / 2, 2 * fartherY - (oneCenterY + otherCenterY) / 2]
        ctx?.moveTo(oneCenterX, oneCenterY)
        ctx?.quadraticCurveTo(controlX, controlY, otherCenterX, otherCenterY)
    }

    function onMove(set, type, index, newPoint) {
        let copyObjects = [...set]
        copyObjects[index] = { ...newPoint }
        if (type !== "edge") {
            setNowVertices(copyObjects)
        }
        else {
            setNowEdges(copyObjects)
        }
    }

    function onResize(set, type, index, newPoint) {
        console.log("새로운 지점 보여 줘", newPoint)
        console.log("타입은 어때?", type, type !== "edge")
        console.log("셋이 뭐더라......", set)
        if (type !== "canvas") {
            let copyObjects = [...set]
            console.log("복사한 결과물이 뭔데?", copyObjects)
            let nowObj = nowObjectList[index]
            console.log("그 새로운 오브젝트가 뭔데?", nowObj)
            // 새로운 툴 사이즈는 현재 트랙커의 중심에서 다시 해당 객체의 위치를 빼서 계산
            copyObjects[index] = { ...nowObj,
                xSize: newPoint.xPos - nowObj.xPos,
                ySize: newPoint.yPos - nowObj.yPos
            }
            console.log("결과 알려줘!", copyObjects[index])
            if (type !== "edge") {
                setNowVertices(copyObjects)
            }
            else {
                console.log("그래서 여기로 왔다는 거지?")
                setNowEdges(copyObjects)
            }
        }
        else {
            setXToolSize(newPoint.xPos)
            setYToolSize(newPoint.yPos)
        }
    }

    useEffect(() => { console.log("그래서 지금 캔버스 크기는?", [xToolSize, yToolSize]) }, [xToolSize, yToolSize])

    function canvasExecute(funcName, e) {
        let rect = e.target.getBoundingClientRect();
        let clkX = e.clientX - rect.left;
        let clkY = e.clientY - rect.top;
        switch (funcName) {
            case "선택": {
                console.log("지금 클릭한 좌표는", clkX, clkY)
                setSelectedId("")
                break
            }
            case "객체 추가": {
                // 가로 세로 각각 2등분해서 안쪽에 소환
                let newX = clkX - (clkX > xToolSize / 2 ? DEFAULT_VERTEX_X_SIZE : 0)
                let newY = clkY - (clkY > yToolSize / 2 ? DEFAULT_VERTEX_Y_SIZE : 0)
                let newId = "----" + (realSummonedCnt + 1)
                let newName = "object - " + (summonedCnt + 1)
                let newVertex = {
                    id: newId, name: newName, xPos: newX, yPos: newY,
                    xSize: DEFAULT_VERTEX_X_SIZE, ySize: DEFAULT_VERTEX_Y_SIZE,
                    customPropertiesList: []
                }
                setNowVertices([...nowVertices].concat(newVertex))
                setInitVertices([...initVertices].concat(newVertex))
                setSummonedCnt(summonedCnt + 1)
                setRealSummonedCnt(realSummonedCnt + 1)
                setSelectedId(newId)
                onSummonObject(newVertex)
                break
            }
            default: {
                console.log("아무 일도 없었다")
            }
        }
    }

    function objectExecute(funcName, e, type) {
        let targetId = e.target.id
        console.log("중점이랑 이름 보여줘", findCenterOf(targetId), findById(targetId).name)
        setInitXToolSize(xToolSize)
        setInitYToolSize(yToolSize)
        switch (funcName) {
            case "선택": {
                console.log("지금 선택된 대상은", findById(targetId))
                setSelectedId(targetId)
                break
            }
            case "관계 추가": {
                // 이미 선택을 한 상태로 실행시 접수 후 객체 추가
                if (selectedId) {
                    let newId = "----" + (realSummonedCnt + 1)
                    let newName = "rel - " + (summonedCnt + 1)
                    let [newX, newY] =
                        targetId === selectedId // loop edge인가?
                            // loop edge이면
                            ? findCenterOf(targetId).map((c, i) => {
                                return (
                                    c - (
                                        c > [xToolSize, yToolSize][i] / 2 // 가로 세로를 각각 2등분해서 어디있는지 보고
                                            // 안쪽에다 열심히 소환
                                            ? [DEFAULT_LOOP_X_DIST, DEFAULT_LOOP_Y_DIST][i]
                                            : [-DEFAULT_LOOP_X_DIST, -DEFAULT_LOOP_Y_DIST][i]
                                    ) - [DEFAULT_EDGE_X_SIZE, DEFAULT_EDGE_Y_SIZE][i] / 2
                                )
                            })
                            // loop edge가 아니면 두 object 중점 사이가 중점이 되도록 소환
                            : findCenterOf(targetId).map((c, i) => {
                                return (
                                    (c + findCenterOf(selectedId)[i]) / 2
                                    - [DEFAULT_EDGE_X_SIZE, DEFAULT_EDGE_Y_SIZE][i] / 2
                                )
                            })
                    let newEdge = {
                        id: newId, name: newName, xPos: newX, yPos: newY,
                        xSize: DEFAULT_EDGE_X_SIZE, ySize: DEFAULT_EDGE_Y_SIZE,
                        // 먼저 선택한 걸 one에, 나중에 선택한 걸 other에
                        one: { id: selectedId }, other: { id: targetId },
                        customPropertiesList: []
                    }
                    setSummonedCnt(summonedCnt + 1)
                    setRealSummonedCnt(realSummonedCnt + 1)
                    setNowEdges(nowEdges.concat(newEdge))
                    setInitEdges(initEdges.concat(newEdge))
                    onSummonObject(newEdge)
                    // 새로운 아이디를 선택
                    setSelectedId(newId)
                }
                else {
                    setSelectedId(targetId)
                }
                break
            }
            case "제거": {
                [...nowVertices, ...nowEdges]
                    .forEach(obj => { console.log("이거 삭제할 거야?", obj.id, isToDelete(obj.id, targetId)) })
                console.log("얘내들 삭제하는 거 맞지?", memo)
                // 기억 못 하는 애들만 남기고 다 지워!!!
                removeAllMemorized(memo, nowVertices, setNowVertices)
                removeAllMemorized(memo, initVertices, setInitVertices)
                removeAllMemorized(memo, nowEdges, setNowEdges)
                removeAllMemorized(memo, initEdges, setInitEdges)
                onDeleteAllObjects([...memo])

                // 다 지웠으니까 기억 초기화
                setMemo(memo.filter(() => false))
                break
            }
            default: {
                console.log("아무 일도 없었다")
            }
        }
    }

    function isToDelete(objId, targetId) {
        // 한 번 지우기로 메모했으면 무조건 지움
        if (memo.includes(objId)) {
            return true
        }
        let obj = findById(objId)
        let result = objId === targetId // 타겟 자신이면 무조건 지움
            // 타겟을 one이나 other로 직접 갖고 있는 애도 다 지움
            || (obj.one && obj.other && (obj.one.id === targetId || obj.other.id === targetId
                // 간접적으로 갖고 있는 애도
                || isToDelete(obj.one?.id, targetId)
                || isToDelete(obj.other?.id, targetId)))
        if (result) {
            // 다시 안 그리면서 상태변경하려고 가변함수 push 사용
            memo.push(objId)
        }
        console.log(objId + "는 " + result + "라고 기억해야지")
        return result
    }

    function removeAllMemorized(memo, searchArray, removeCallback = f => f) {
        let filteredArray = searchArray.filter(elem => (!memo.includes(elem.id)))
        removeCallback(filteredArray)
    }

    function findTypeAndIndexOf(objId) {
        let rawIndex = extractIndex(nowObjectList, objId)
        console.log("찾은 날 인덱스는", rawIndex)
        // 날 인덱스가 nowVertices.length 미만이면 vertex 아니면 edge
        let resultType = rawIndex < nowVertices.length ? "vertex" : "edge"
        let [initArray, nowArray] = resultType === "vertex" ? [initVertices, nowVertices] : [initEdges, nowEdges]
        let resultIndex = extractIndex(nowArray, objId)
        console.log("여기 결과 다시 줘 봐", resultType, resultIndex, initArray, nowArray)
        return [resultType, resultIndex, initArray, nowArray]
    }

    function extractIndex(array, id) {
        return [...array]
            .map((obj, idx) => obj?.id === id ? idx : -1)
            .filter(idx => idx > -1)[0]
    }

    function calcTrackerPos(selectedId, type) {
        let searchArray = findTypeAndIndexOf(selectedId)
        let index = searchArray[1]
        let initArray = searchArray[2]
        let nowArray = searchArray[3]
        let found = type === "init" ? { ...(initArray[index]) } : { ...(nowArray[index]) }
        //트래커의 init은 현재 위치에다 더해야
        return {
            xPos: nowArray[index]?.xPos + found?.xSize,
            yPos: nowArray[index]?.yPos + found?.ySize
        }
    }

    function calcTrackerBound(selectedId, type) {
        let searchArray = findTypeAndIndexOf(selectedId)
        let index = searchArray[1]
        let nowArray = searchArray[3]
        console.log("이건 또 뭔데?", index, nowArray)
        // 얘 변수명 xSize, ySize로 잘못 이해했다가 거의 망했었지......
        return {
            xPos: nowArray[index].xPos + (type === "max" ? X_MAX_OBJSIZE : X_MIN_OBJSIZE),
            yPos: nowArray[index].yPos + (type === "max" ? Y_MAX_OBJSIZE : Y_MIN_OBJSIZE)
        }
    }

    // 무조건 한 번 그리고
    useEffect(redraw)

    // 움직이면 다시 그려라
    useMemo(redraw, [nowVertices, nowEdges])

    console.log("툴 사이즈 초기값은?", initXToolSize, initYToolSize)

    return <table>
        <tr>
            <td>
                <Remocon index={nowFunc} writer={writer} type="rel" onSelect={onSelect} />
                <br />
            </td>
            <td>
                {console.log("야 너희 둘 같아?", auth.userId, writer.id)}
                {auth?.userId === writer?.id
                    ? <Button variant="success"
                        // 조금이라도 위험하면 세이브 못 하게 할 거야
                        disabled={nowObjectList.reduce((current, inputObj) => {
                            let propList = inputObj.customPropertiesList
                            // 기존에 위험한 게 있었거나 이번 게 안전하지 않으면 위험한 게 있는 것이다
                            return current || isAnyDanger(propList)
                        }, false)}
                        onClick={() => onSaveTool(state?.toolId, state?.writer, auth)}
                    >
                        저장하기
                    </Button>
                    : ""
                }
            </td>
        </tr>
        <tr><td colSpan={2}>
            <div style={{ position: "relative", width: xToolSize, height: yToolSize, margin: "auto" }}>
                <canvas class="Canvas" ref={canvasRef} width={xToolSize} height={yToolSize}
                    style={{ borderColor: "#000000", border: "1px dotted" }}
                    onClick={(e) => canvasExecute(nowFuncName, e)}
                />
                {nowEdges.map((edge, index) => {
                    let init = initEdges[index]
                    return <UseGestureElement
                        id={edge.id}
                        init={init}
                        pos={edge}
                        set={nowEdges}
                        type="edge"
                        index={index}
                        onMove={onMove}
                        onClick={(e) => objectExecute(nowFuncName, e, "edge")}
                        bound={canvasBound(init, xToolSize, yToolSize, edge)}
                    />
                })}
                {nowVertices.map((vertex, index) => {
                    let init = initVertices[index]
                    return <UseGestureElement
                        id={vertex.id}
                        init={init}
                        pos={vertex}
                        set={nowVertices}
                        type="vertex"
                        index={index}
                        onMove={onMove}
                        onClick={(e) => objectExecute(nowFuncName, e, "vertex")}
                        bound={canvasBound(init, xToolSize, yToolSize, vertex)}
                    />
                })}
                {!selectedId
                    ? <Tracker
                        type="canvas"
                        pos={{ xPos: xToolSize, yPos: yToolSize }}
                        init={{ xPos: initXToolSize, yPos: initYToolSize }}
                        minSize={{ xSize: X_MIN_TOOLSIZE, ySize: Y_MIN_TOOLSIZE }}
                        maxSize={{ xSize: X_MAX_TOOLSIZE, ySize: Y_MAX_TOOLSIZE }}
                        onResize={onResize}
                    />
                    : <Tracker
                        type={findTypeAndIndexOf(selectedId)[0]}
                        index={findTypeAndIndexOf(selectedId)[1]}
                        pos={{ ...calcTrackerPos(selectedId, "now") }}
                        init={{ ...calcTrackerPos(selectedId, "init") }}
                        minSize={{ ...calcTrackerBound(selectedId, "min") }}
                        maxSize={{ ...calcTrackerBound(selectedId, "max") }}
                        onResize={onResize}
                    />

                }
            </div>
        </td></tr>
    </table>
}

function canvasBound(init, xMax, yMax, obj) {
    return {
        left: 0 - init.xPos,
        right: xMax - obj.xSize - init.xPos,
        top: 0 - init.yPos,
        bottom: yMax - obj.ySize - init.yPos
    }
}