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

    function onSummonObject(customObject) {
        console.log("오브젝트 소환!", customObject)
        setNowObjectList([...nowObjectList, customObject])
    }

    function onDeleteAllObjects(deleteIdArray) {
        console.log("누구를 삭제한다고?", deleteIdArray)
        console.log("어디서 삭제한다고?", nowObjectList)
        setNowObjectList([...nowObjectList].filter(obj => ! deleteIdArray.includes(obj.id)))
    }

    function onUpdate(newList, index) {
        console.log("주문하신 물품은?", newList)
        let copyArray = [...nowObjectList]
        console.log("복사 잘 됐니?", copyArray)
        copyArray[index].customPropertiesList = newList
        console.log("잘 바뀌었니?", copyArray)
        setNowObjectList(copyArray)
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
                    onSummonObject={onSummonObject}
                    onDeleteAllObjects={onDeleteAllObjects}
                />
            </td>
            <td style={{ width: "100%" }}>
                <PropAccordion
                    nowObjectList = {nowObjectList} onUpdate={onUpdate}
                />
            </td>
        </table>
    </>
}
