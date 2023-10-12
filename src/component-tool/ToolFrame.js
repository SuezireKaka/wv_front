import { Fetch } from "toolbox/Fetch"

export default function ToolFrame({tool}) {
    let canvas = <canvas style={{border : "1px dotted"}} width={tool.xToolSize} height={tool.yToolSize}/>

    const READY_FOR_GRAPH = `http://localhost:8080/tool/anonymous/getToolById/${tool.id}`

    function drawAll(toolWithGraph) {
        console.log("그림 그리는 중")
        console.log(toolWithGraph)
        if (toolWithGraph.id) {
            let customEntities = toolWithGraph.customEntityList
            let customRelations = toolWithGraph.customRelationList
            console.log("선 그리는 중")
            
            
        }
        return canvas
    }

    return <Fetch uri={READY_FOR_GRAPH} renderSuccess={drawAll}/>
}