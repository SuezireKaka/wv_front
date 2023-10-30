import { useState, useRef, useMemo, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';

export function UseGestureList({
    vertices = [
        {id : "0000", name:"ssss1", x_pos:0, y_pos:0, x_size:100, y_size:100},
        {id : "0001", name:"ssss2", x_pos:100, y_pos:170, x_size:100, y_size:100},
        {id : "0002", name:"ssss3", x_pos:500, y_pos:50, x_size:100, y_size:100},
    ]
}) {
    const init = vertices
    const canvasRef = useRef()
    const [nowVertices, setNowVertices] = useState(vertices)

    function center({x_pos, y_pos, x_size, y_size}) {
        // x축은 3.3배정도, y축은 5.1배 정도 길이 but why?
        let result = [x_pos + x_size / 2, y_pos + y_size / 2]
        console.log("여기가 지금 중점이라며?", ...result)
        return result
    }

    function redraw() {
        let ctx = canvasRef.current?.getContext("2d")
        console.log("넌 누구니?", ctx)
        
        ctx?.reset()
        ctx?.beginPath()
        ctx?.moveTo(...center(nowVertices[0]))
        nowVertices.reduce((_, goal) => {
            ctx?.lineTo(...center(goal))
            return goal
        })
        ctx?.stroke();
    }

    function onMove(index, newPoint) {
        let copyVertices = [...nowVertices]
        copyVertices[index] = {...newPoint}
        setNowVertices(copyVertices)
    }

    // 무조건 한 번 다시 그리고
    useEffect(redraw, [])

    // 움직이면 다시 그려라
    useMemo(redraw, [nowVertices])

    return <div style={{position:"relative", width:"1024px", height:"768px", margin: "0 auto"}}>
        <canvas class="Canvas" ref={canvasRef} style={{width:"1024px", height:"768px", borderColor:"#000000", border: "1px dotted"}}/>
        {nowVertices.map((vertex, index) =>
            <UseGestureElement
                init={init[index]}
                pos={vertex}
                index={index}
                onMove={onMove}
            />)}
    </div>
}

export function UseGestureElement({init, pos, index, onMove = f => f}) {
    
    const bindPos = useDrag((params) => {
        onMove(index, {
            ...pos,
            x_pos: params.offset[0] + init.x_pos,
            y_pos: params.offset[1] + init.y_pos
        })
    }, {
        bounds: {
            left: 0 - init.x_pos,
            right: 1024 - pos.x_size - init.x_pos,
            top: 0 - init.y_pos,
            bottom: 768 - pos.y_size - init.y_pos
        }
    });

    return <button {...bindPos()}
        style={{ /*MODIFIED!*/
            position:"absolute",
            left: pos.x_pos,
            top: pos.y_pos,
            width: pos.x_size,
            height: pos.y_size
        }}
    >
        {pos.name}
    </button>
}