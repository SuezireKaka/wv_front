import ToolDetail from 'component-tool/ToolDetail';
import { useState, useRef, useContext, createContext } from 'react';
import AppContext from "context/AppContextProvider";

const ToolContext = createContext({});

export const ToolContextProvider = ({ children }) => {

    const [nowName, setNowName] = useState("")

    const [xToolSize, setXToolSize] = useState(500)
    const [yToolSize, setYToolSize] = useState(500)

    const [initVertices, setInitVertices] = useState([])
    const [initEdges, setInitEdges] = useState([])

    const [nowVertices, setNowVertices] = useState([])
    const [nowEdges, setNowEdges] = useState([])

    const [nowObjectList, setNowObjectList] = useState([])

    function onSummonObject(customObject) {
        console.log("오브젝트 소환!", customObject)
        console.log("기존 결과 보여줘!", [...nowObjectList])
        console.log("지금 결과 보여줘!", [...nowObjectList, customObject])
        setNowObjectList([...nowObjectList, customObject])
    }

    function onDeleteAllObjects(deleteIdArray) {
        console.log("누구를 삭제한다고?", deleteIdArray)
        console.log("어디서 삭제한다고?", nowObjectList)
        setNowObjectList([...nowObjectList].filter(obj => !deleteIdArray.includes(obj.id)))
    }

    function onUpdate(newList, index) {
        console.log("주문하신 물품은?", newList)
        let copyArray = [...nowObjectList]
        console.log("복사 잘 됐니?", copyArray)
        copyArray[index].customPropertiesList = [...newList]
        console.log("잘 바뀌었니?", copyArray)
        setNowObjectList(copyArray)
    }

    return (
        <ToolContext.Provider value={{
            nowName, setNowName,
            xToolSize, setXToolSize, yToolSize, setYToolSize,
            initVertices, setInitVertices, initEdges, setInitEdges,
            nowVertices, setNowVertices, nowEdges, setNowEdges,
            nowObjectList, setNowObjectList,
            onSummonObject, onDeleteAllObjects, onUpdate
        }}>
            {children}
        </ToolContext.Provider>
    )
}

export default ToolContext;