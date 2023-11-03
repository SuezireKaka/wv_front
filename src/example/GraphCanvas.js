import { useState, useRef, useMemo, useEffect } from 'react';
import RelRemocon from './RelRemocon';
import UseGestureElement from './UseGestureElement';

export default function GraphCanvas({
    vertices = [], edges = [], xToolSize = 1024, yToolSize = 768,
    onSummonObject = f => f, onDeleteAllObjects = f => f
}) {
    const [DEFAULT_VERTEX_X_SIZE, DEFAULT_VERTEX_Y_SIZE,
        DEFAULT_EDGE_X_SIZE, DEFAULT_EDGE_Y_SIZE,
        DEFAULT_LOOP_X_DIST, DEFAULT_LOOP_Y_DIST]
        = [100, 100, 50, 50, 150, 150]
    const canvasRef = useRef()

    const [initVertices, setInitVertices] = useState(vertices)
    const [initEdges, setInitEdges] = useState(edges)

    const [nowVertices, setNowVertices] = useState(vertices)
    const [nowEdges, setNowEdges] = useState(edges)

    const [nowFunc, setNowFunc] = useState(0)
    const [nowFuncName, setNowFuncName] = useState("선택")
    const [remainCnt, setRemainCnt] = useState(1)
    // 위에는 id랑, 아래는 이름이랑 엮기 - 복붙시 위에만 증가
    const [realSummonedCnt, setRealSummonedCnt] = useState(0)
    const [summonedCnt, setSummonedCnt] = useState(0)

    const [selectedId, setSelectedId] = useState()
    const [copiedId, setCopiedId] = useState()

    // 재귀함수로 삭제할 때 이미 삭제할 것으로 정해진 애들을 기억해서 무시할 수 있도록 하는 용도
    const [memo, setMemo] = useState([])

    function onSelect(index, name, clickCnt) {
        setNowFunc(index)
        setNowFuncName(name)
        setRemainCnt(clickCnt)
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
        console.log("넌 누구니?", ctx)

        ctx?.reset()
        ctx?.beginPath()
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
        if (type === "vertex") {
            setNowVertices(copyObjects)
        }
        else {
            setNowEdges(copyObjects)
        }
    }

    function canvasExecute(funcName, e) {
        let rect = e.target.getBoundingClientRect();
        let clkX = e.clientX - rect.left;
        let clkY = e.clientY - rect.top;
        switch (funcName) {
            case "선택": {
                console.log("지금 클릭한 좌표는", clkX, clkY)
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
                    xSize: DEFAULT_VERTEX_X_SIZE, ySize: DEFAULT_VERTEX_Y_SIZE
                }
                setNowVertices(nowVertices.concat(newVertex))
                setInitVertices(initVertices.concat(newVertex))
                setSummonedCnt(summonedCnt + 1)
                setRealSummonedCnt(realSummonedCnt + 1)
                onSummonObject({id : newId, name : newName, customPropertiesList : []})
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
                        one: { id: selectedId }, other: { id: targetId }
                    }
                    setSummonedCnt(summonedCnt + 1)
                    setRealSummonedCnt(realSummonedCnt + 1)
                    setNowEdges(nowEdges.concat(newEdge))
                    setInitEdges(initEdges.concat(newEdge))
                    onSummonObject({id : newId, name : newName, customPropertiesList : []})
                    // 선택했다는 정보를 초기화
                    setSelectedId()
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
            console.log("기억났어!")
            return true
        }
        let obj = findById(objId)
        console.log("누군지 기억이 가물가물...", obj)
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

    // 무조건 한 번 그리고
    useEffect(redraw, [])

    // 움직이면 다시 그려라
    useMemo(redraw, [nowVertices, nowEdges])

    console.log("지금 선택된 아이디 나와!", nowVertices, nowEdges)

    return <div>
        <RelRemocon index={nowFunc} remain={remainCnt} onSelect={onSelect} />
        <br />
        {selectedId
            ? <p>{"지금 선택된 id는 " + selectedId + "입니다."}</p>
            : null
        }
        <br />
        {copiedId
            ? <p>{"복사 중인 id는 " + copiedId + "입니다."}</p>
            : null
        }
        <div style={{ position: "relative", width: xToolSize, height: yToolSize, margin: "auto" }}>
            <canvas class="Canvas" ref={canvasRef} width={xToolSize} height={yToolSize}
                style={{ borderColor: "#000000", border: "1px dotted" }}
                onClick={(e) => canvasExecute(nowFuncName, e)}
            />
            {nowEdges.map((edge, index) =>
                <UseGestureElement
                    id={edge.id}
                    canvasSize={[xToolSize, yToolSize]}
                    init={initEdges[index]}
                    pos={edge}
                    set={nowEdges}
                    type="edge"
                    index={index}
                    onMove={onMove}
                    onClick={(e) => objectExecute(nowFuncName, e, "edge")}
                />)
            }
            {nowVertices.map((vertex, index) =>
                <UseGestureElement
                    id={vertex.id}
                    canvasSize={[xToolSize, yToolSize]}
                    init={initVertices[index]}
                    pos={vertex}
                    set={nowVertices}
                    type="vertex"
                    index={index}
                    onMove={onMove}
                    onClick={(e) => objectExecute(nowFuncName, e, "vertex")}
                />)
            }
        </div>
    </div>

}