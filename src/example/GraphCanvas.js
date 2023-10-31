import { useState, useRef, useMemo, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import Remocon from './Remocon';

export function GraphCanvas({
    initVertices = [
        { id: "0000", name: "ssss1", xPos: 0, yPos: 0, xSize: 100, ySize: 100 },
        { id: "0001", name: "ssss2", xPos: 200, yPos: 170, xSize: 100, ySize: 100 },
        { id: "0002", name: "ssss3", xPos: 500, yPos: 50, xSize: 100, ySize: 100 },
    ],
    initEdges = [
        { id: "0004", name: "rel1", xPos: 100, yPos: 500, xSize: 50, ySize: 50, one: { id: "0000" }, other: { id: "0001" } },
        { id: "0005", name: "rel2", xPos: 300, yPos: 350, xSize: 50, ySize: 50, one: { id: "0001" }, other: { id: "0002" } }
    ]
}) {
    const canvasRef = useRef()
    const [nowVertices, setNowVertices] = useState(initVertices)
    const [nowEdges, setNowEdges] = useState(initEdges)

    const funcArray = ["선택", "+객체", "+관계", "-객체", "-관계", "복사", "붙여넣기"]
    const [nowFunc, setNowFunc] = useState(0)

    function center(xPos, yPos, xSize, ySize) {
        // x축은 3.3배정도, y축은 5.1배 정도 길이 but why?
        let result = [xPos + xSize / 2, yPos + ySize / 2]
        console.log("여기가 지금 중점이라며?", ...result)
        return result
    }

    function findCenterOf(vertexId) {
        let filteredArray = nowVertices.filter(vertex => vertex.id === vertexId)
        console.log("이 어레이는 뭐야?", filteredArray)
        if (filteredArray && filteredArray.length > 0) {
            let selected = filteredArray[0]
            console.log("뭐가 선택된 거야?", selected)
            return center(selected.xPos, selected.yPos, selected.xSize, selected.ySize)
        }
        else {
            return null
        }
    }

    function redraw() {
        let ctx = canvasRef.current?.getContext("2d")
        console.log("넌 누구니?", ctx)

        ctx?.reset()
        ctx?.beginPath()
        nowEdges.forEach((relation) => {
            console.log("지금부터 이거 그릴게요", relation)
            let [oneCenterX, oneCenterY] = findCenterOf(relation.one.id)
            let [otherCenterX, otherCenterY] = findCenterOf(relation.other.id)
            let [fartherX, fartherY] = center(relation.xPos, relation.yPos, relation.xSize, relation.ySize)
            // 베지에 커브를 미분해서 역으로 풀면 이렇게 나옴
            let [controlX, controlY] =
                [2 * fartherX - (oneCenterX + otherCenterX) / 2, 2 * fartherY - (oneCenterY + otherCenterY) / 2]
            console.log("여보세요", ...(findCenterOf(relation.one.id)))
            ctx?.moveTo(...(findCenterOf(relation.one.id)))
            ctx?.quadraticCurveTo(controlX, controlY, ...(findCenterOf(relation.other.id)))
        })
        ctx?.stroke();
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

    function graphExecute(func, e) {
        let rect = e.target.getBoundingClientRect();
        let clkX = e.clientX - rect.left;
        let clkY = e.clientY - rect.top;
        switch (func) {
            case 0 : {
                
                console.log("지금 클릭한 좌표는", clkX, clkY)
                break
            }
            case 1 : {
                
                break
            }
            default : {
                console.log("아무 일도 없었다")
            }
        }
    }

    // 무조건 한 번 다시 그리고
    useEffect(redraw, [])

    // 움직이면 다시 그려라
    useMemo(redraw, [nowVertices, nowEdges])

    return <>
        <Remocon funcArray={funcArray} index={nowFunc} setNowIndex={setNowFunc}/>
        <br/>
        <div style={{ position: "relative", width: "1024px", height: "768px", margin: "0 auto" }}>
            <canvas class="Canvas" ref={canvasRef} width="1024px" height="768px"
                style={{ borderColor: "#000000", border: "1px dotted" }}
                onClick={(e) => graphExecute(nowFunc, e)}
            />
            {nowEdges.map((edge, index) =>
                <UseGestureElement
                    init={initEdges[index]}
                    pos={edge}
                    set={nowEdges}
                    type="edge"
                    index={index}
                    onMove={onMove}
                />)
            }
            {nowVertices.map((vertex, index) =>
                <UseGestureElement
                    init={initVertices[index]}
                    pos={vertex}
                    set={nowVertices}
                    type="vertex"
                    index={index}
                    onMove={onMove}
                />)
            }
        </div>
    </>
}

export function UseGestureElement({ init, pos, set, type, index, onMove = f => f }) {

    const bindPos = useDrag((params) => {
        onMove(set, type, index, {
            ...pos,
            xPos: params.offset[0] + init.xPos,
            yPos: params.offset[1] + init.yPos
        })
    }, {
        bounds: {
            left: 0 - init.xPos,
            right: 1024 - pos.xSize - init.xPos,
            top: 0 - init.yPos,
            bottom: 768 - pos.ySize - init.yPos
        }
    });

    return <button {...bindPos()}
        style={{ /*MODIFIED!*/
            position: "absolute",
            left: pos.xPos,
            top: pos.yPos,
            width: pos.xSize,
            height: pos.ySize
        }}
    >
        {pos.name}
    </button>
}