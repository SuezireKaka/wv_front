import { useRef } from "react"
import { Fetch } from "toolbox/Fetch"
import drawGraph from "./Graph"

export default function ToolFrame({tool}) {
    const canvasRef = useRef()

    const READY_FOR_GRAPH = `http://localhost:8080/tool/anonymous/getToolById/${tool.id}`

    function drawAll(toolWithGraph) {
        console.log("그림 그리는 중")
        console.log(toolWithGraph)
        if (toolWithGraph.id) {
            let customEntities = toolWithGraph.customEntityList
            let customRelations = toolWithGraph.customRelationList
            console.log("그래프 그리는 중")
            console.log(customEntities, customRelations)
            customRelations.forEach(relation => {
                const ctx = canvasRef.current.getContext("2d");
                let [oneCenterX, oneCenterY] =
                    [relation.one.xPos + relation.one.xSize / 2, relation.one.yPos + relation.one.ySize / 2]
                let [otherCenterX, otherCenterY] =
                    [relation.other.xPos + relation.other.xSize / 2, relation.other.yPos + relation.other.ySize / 2]
                console.log("이거 되니!?")
                console.log(otherCenterX)
            });
            
        }
        return <div>
            <canvas ref={canvasRef} style={{border : "1px dotted"}} width={tool.xToolSize} height={tool.yToolSize}/>
        </div>
    }

    return <Fetch uri={READY_FOR_GRAPH} renderSuccess={drawAll}/>
}