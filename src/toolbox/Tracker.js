import UseGestureElement from "toolbox/UseGestureElement"
import { useContext } from "react";
import ToolContext from 'component-tool/ToolContextProvider';

export const TRACKER_SIZE = { x: 20, y: 20 }

export default function Tracker({
    minSize = { xPos: 50, yPos: 25 },
    maxSize = { xPos: 200, yPos: 100 },
    init, pos, type, index, style,
    onResize = f => f
}) {
    const {nowVertices, nowEdges} = useContext(ToolContext);

    return <UseGestureElement
        index={index}
        set={type === "vertex" ? nowVertices : nowEdges}
        init={{
            ...init,
            xPos: init.xPos - TRACKER_SIZE.x / 2,
            yPos: init.yPos - TRACKER_SIZE.y / 2
        }}
        pos={{
            ...pos,
            xPos: pos.xPos - TRACKER_SIZE.x / 2,
            yPos: pos.yPos - TRACKER_SIZE.y / 2,
            xSize: TRACKER_SIZE.x,
            ySize: TRACKER_SIZE.y
        }}
        onMove={onResize}
        type={type}
        bound={constructTrackerBound(minSize, maxSize, init)}
        style={style}
    />
}

function constructTrackerBound(minSize, maxSize, init) {
    return {
        // init 좌표는 init에 보면 기준값에서 TRACKER_SIZE가 빠진 값이므로 이를 다시 더해서 기준으로 삼기
        left: minSize.xPos - init.xPos + TRACKER_SIZE.x / 2,
        right: maxSize.xPos - init.xPos + TRACKER_SIZE.x / 2,
        top: minSize.yPos - init.yPos + TRACKER_SIZE.y / 2,
        bottom: maxSize.yPos - init.yPos + TRACKER_SIZE.y / 2
    }
}