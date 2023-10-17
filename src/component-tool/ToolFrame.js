import { useRef, useState } from "react"
import { Fetch } from "toolbox/Fetch"

export default function ToolFrame({tool, onSelect = f => f}) {
    const READY_FOR_GRAPH = `http://localhost:8080/tool/anonymous/getToolById/${tool.id}`

    console.log("지금 선택된 툴은", tool)

    const canvasRef = useRef()

    function Graph({toolWithGraph = {customEntityList : [], customRelationList : []}, onSelect = f => f}) {
        
        console.log("이걸 그리는 중입니다", toolWithGraph)

        let customEntities = []
        let customRelations = []

        if (toolWithGraph && toolWithGraph?.customEntityList) {
            customEntities = toolWithGraph.customEntityList;
            customRelations = toolWithGraph.customRelationList;
            console.log("관계 나와라 얍!", customRelations)
            customRelations.forEach(relation => {
                const ctx = canvasRef.current.getContext("2d");
                ctx.reset();
                let [oneCenterX, oneCenterY] =
                    [relation.one.xPos + relation.one.xSize / 2, relation.one.yPos + relation.one.ySize / 2]
                let [otherCenterX, otherCenterY] =
                    [relation.other.xPos + relation.other.xSize / 2, relation.other.yPos + relation.other.ySize / 2]
                let [fartherX, fartherY] =
                    [relation.xPos, relation.yPos]
                let [controlX, controlY] =
                    [2 * fartherX - (oneCenterX + otherCenterX) / 2, 2 * fartherY - (oneCenterY + otherCenterY) / 2]
                ctx.moveTo(oneCenterX, oneCenterY)
                ctx.quadraticCurveTo(controlX, controlY, otherCenterX, otherCenterY)
                ctx.stroke();
            })
        }
        
        return <div style={{position: "relative"}}>
            {customEntities.length > 0 ? customEntities.map(entity =>
                // 크기에 맞게 버튼 생성
                <button style={{position: "absolute", // 위치의 절대화
                    left:entity.xPos, top:entity.yPos, width:entity.xSize, height:entity.ySize}}
                    onClick={e => onSelect(entity)}
                >
                    {entity.name}
                </button>
            ) : ""}
            {customRelations.length > 0 ? customRelations.map(relation =>
                // 크기에 맞게 버튼 생성
                <button style={{position: "absolute", // 위치의 절대화
                    left:relation.xPos - relation.xSize / 2, top:relation.yPos - relation.ySize / 2,
                    width:relation.xSize, height:relation.ySize}}
                    onClick={() => onSelect(relation)}
                >
                    {relation.name}
                </button>
            ) : ""}
            <canvas ref={canvasRef} style={{border : "1px dotted"}} width={tool.xToolSize} height={tool.yToolSize}/>
        </div>
    }

    return <Fetch uri={READY_FOR_GRAPH} loadingFallBack={<p>loading...</p>}
        renderSuccess={toolWithGraph => <Graph toolWithGraph={toolWithGraph} onSelect={onSelect}/>}
        doLog="true"
    />
}