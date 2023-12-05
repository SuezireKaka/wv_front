import { useContext } from "react"
import AppContext from "context/AppContextProvider";


export default function Remocon({ index = 1, type = "", writer, onSelect = f => f, immediate = f => f }) {
    const { auth, relationRemocon, explorerRemocon } = useContext(AppContext);
    let selectedRemocon;
    // 타입에 따라 어떤 리모콘을 선택할 것인지 결정
    switch (type) {
        case "rel" :
            selectedRemocon = relationRemocon;
            break;
        case "xpl" :
            selectedRemocon = explorerRemocon;
            break;
        default :
            selectedRemocon = null;
    }
    const remoteKeyList = selectedRemocon?.remoteKeyList

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
        {remoteKeyList?.filter(key => remoconAuth(auth, writer, key.auth)).map(
            (rmt, index) => <button onClick={
                () => rmt.isImmediate
                ? immediate(rmt.name, index)
                : onSelect(rmt.name, index)
            }>{rmt.name}</button>
        )}
    </div>
}

function remoconAuth(auth, writer, authCode) {
    // 먼저 and를 기준으로 분해하고 or을 기준으로 분해 -> 연산순서
    let andArray = authCode.split(" and ")
    let orArrayOfArray = andArray.map(clause => clause.split(" or "))
    
    // 먼저 and로 쪼갠 걸 다시 or로 쪼갠 어레이들을 기준으로
    let result = orArrayOfArray.reduce(
        (lemma_fitst, nextArray) => {
            let bool = nextArray.reduce(
                // or로 쪼개인 각 조건에 대해 하나라도 참이면 일단 중간단계에 참으로 저장하기
                (lemma_second, nextAuth) => {return lemma_second || codeToAuth(auth, writer, nextAuth)}
                , false
            )
            // and로 쪼개진 모든 중간결과 중 하나라도 거짓이면 안 보여주기
            return lemma_fitst && bool
        }, true
    )
    return result
}

function codeToAuth(auth, writer, authCode) {
    switch (authCode) {
        // 모두에게 공개
        case "all":
            return true
        // 로그인 했으면 공개
        case "login":
            return auth
        // 작가 본인에게만 공개
        case "self":
            return auth?.userId === writer?.id
        // 매니저에게 공개
        case "manage":
            return auth?.roles.includes('manager') || auth?.roles.includes('admin')
        // 조건이 안 걸려 있으면 아직 제작중인 걸로 보고 비공개
        default:
            return false
    }
}

