import { useState, useRef, useMemo, useEffect } from 'react';
import GraphCanvas from "./GraphCanvas"
import PropAccordion from './PropAccordion';

export default function Test4({toolDetail = {
    xToolSize : 1024,
    yToolSize : 768,
    customEntityList : [],
    customRelationList : [],
}}) {
    const [xToolSize, setXToolSize] = useState(toolDetail.xToolSize)
    const [yToolSize, setYToolSize] = useState(toolDetail.yToolSize)
    const [nowObjectList, setNowObjectList]
        = useState([...toolDetail.customEntityList, ...toolDetail.customRelationList]
            .map(obj => {
                return {id : obj?.id, name : obj?.name, customPropertiesList : obj?.customPropertiesList}
            })
        )

    function onSummonVertex(customObject) {
        console.log("객체 소환!", customObject)
        setNowObjectList([...nowObjectList, customObject])
    }

    console.log("그래서 지금 오브젝트 목록이 어케 된다고?", nowObjectList)

    return <>
        테스트4
        <br/>
        <table>
            <td style={{ width: xToolSize + 100 }}>
                <GraphCanvas
                    xToolSize={xToolSize} yToolSize={yToolSize}
                    vertices={toolDetail.customEntityList} edges={toolDetail.customRelationList}
                    onSummonVertex={onSummonVertex}
                />
            </td>
            <td style={{ width: "100%" }}>
                <PropAccordion
                    nowObjectList = {nowObjectList} setNowObjectList={setNowObjectList}
                />
            </td>
        </table>
    </>
}
