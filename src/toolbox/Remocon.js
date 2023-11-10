import { useContext } from "react"
import AppContext from "context/AppContextProvider";


export default function Remocon({ index = 0, type = "", writer, onSelect = f => f, immediate = f => f }) {
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
        {remoteKeyList?.filter(key => {console.log("얘 살려?", remoconAuth(auth, writer, key.auth)); return remoconAuth(auth, writer, key.auth)}).map(
            (rmt, index) => <button onClick={
                () => rmt.isImmediate
                ? immediate(index, rmt.name)
                : onSelect(index, rmt.name)
            }>{rmt.name}</button>
        )}
    </div>
}

function remoconAuth(auth, writer, authCode) {
    let andArray = authCode.split(" and ")
    console.log("논리식 분해중......1", andArray)
    let orArrayOfArray = andArray.map(clause => clause.split(" or "))
    console.log("논리식 분해중......2", orArrayOfArray)
    // reduce 안 reduce 실화?
    let result = orArrayOfArray.reduce(
        (lemma_fitst, nextArray) => {
            let bool = nextArray.reduce(
                (lemma_second, nextAuth) => {return lemma_second || codeToAuth(auth, writer, nextAuth)}, false
            )
            return lemma_fitst && bool
        }, true
    )

    return result
}

function codeToAuth(auth, writer, authCode) {
    switch (authCode) {
        case "all":
            return true
        case "login":
            return auth
        case "self":
            console.log("넌 누구야?", auth)
            console.log("이건 누가 썼는데?", writer)
            return auth?.userId === writer?.id
        case "manage":
            console.log("롤 좀 보여줄래?", auth?.roles)
            return auth?.roles.includes('manager') || auth?.roles.includes('admin')
        default:
            return false
    }
}