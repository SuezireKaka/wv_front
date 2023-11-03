import { useContext } from "react"
import AppContext from "context/AppContextProvider";


export default function RelRemocon({index = 0, onSelect = f => f}) {
    const { relationRemocon } = useContext(AppContext);
    const remoteKeyList = relationRemocon?.remoteKeyList

    console.log("리모콘 또 실종", relationRemocon)
    console.log("버튼은 어디갔지", remoteKeyList)

    return <div style={{marginBottom : "5px"}}>
        <p>{
            "지금 선택된 기능은 '" +
            (remoteKeyList && remoteKeyList.length > 0
            ? remoteKeyList[index].name + "'입니다.\n" 
            : "없습니다.")}
            <br/>
            {(remoteKeyList && remoteKeyList.length > 0
            ? remoteKeyList[index].info
            : "")
        }</p>
        {remoteKeyList?.map(
            (rmt, index) => <button onClick={() => onSelect(index, rmt.name, rmt.clickCnt)}>{rmt.name}</button>
        )}
    </div>
}