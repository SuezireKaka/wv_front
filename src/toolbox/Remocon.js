import { useContext } from "react"
import AppContext from "context/AppContextProvider";


export default function Remocon({ index = 0, type = "", writer, onSelect = f => f }) {
    const { auth, relationRemocon, explorerRemocon } = useContext(AppContext);
    const selectedRemocon =
        type === "rel"
            ? relationRemocon
            : type === "xpl"
                ? explorerRemocon
                : null
    const remoteKeyList = selectedRemocon?.remoteKeyList

    console.log("리모콘 또 실종", relationRemocon)
    console.log("버튼은 어디갔지", remoteKeyList)

    return <div style={{ marginBottom: "5px" }}>
        <p>{
            "지금 선택된 기능은 '" +
            (remoteKeyList && remoteKeyList.length > 0
                ? remoteKeyList[index].name + "'입니다.\n"
                : "없습니다.")}
            <br />
            {(remoteKeyList && remoteKeyList.length > 0
                ? remoteKeyList[index].info
                : "")
            }</p>
        {remoteKeyList?.map(
            (rmt, index) => <button onClick={() => onSelect(index, rmt.name, rmt.clickCnt)}>{rmt.name}</button>
        )}
    </div>
}

function remoconAuth(auth, writer, authCode) {
    switch (authCode) {
        case "all":
            return true
        case "login":
            return auth
        case "self":
            return auth?.id === writer?.id
        case "manage":
            return auth?.roles.includes('manager') || auth?.roles.includes('admin')
        default:
            return false
    }
}