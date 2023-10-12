import { Fetch } from "toolbox/Fetch"
import drawGraph from "./Graph"

export default function ToolFrame({tool}) {
    const canvas = <canvas style={{border : "1px dotted"}} width={tool.xToolSize} height={tool.yToolSize}/>

    const READY_FOR_GRAPH = `http://localhost:8080/tool/anonymous/getToolById/${tool.id}`

    function drawAll(toolWithGraph) {
        console.log("그림 그리는 중")
        console.log(toolWithGraph)
        if (toolWithGraph.id) {
            let customEntities = toolWithGraph.customEntityList
            let customRelations = toolWithGraph.customRelationList
            console.log("그래프 그리는 중")
            console.log(customEntities, customRelations)
            drawGraph(canvas, customEntities, customRelations)
        }
        else {
            drawGraph(canvas, [], [])
        }
        return <div>
            {canvas}
        </div>
    }

    return <Fetch uri={READY_FOR_GRAPH} renderSuccess={drawAll}/>
}