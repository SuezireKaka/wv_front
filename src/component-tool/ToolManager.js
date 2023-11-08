import { displayDate } from "toolbox/DateDisplayer";
import { Link } from "react-router-dom";

export default function ToolManager({ tool, state, onManage = f => f, onCancel = f => f}) {
    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    return <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
        <td><input type="text" placeholder="툴 이름을 입력하세요" maxLength={30}/></td>
        <td><input type="number" min={100} max={2000}/>{" X "}<input type="number" min={100} max={2000}/></td>
        <td></td>
        <td>
            <button onClick={onManage}>저장</button>
            {" : "}
            <button onClick={onCancel}>취소</button>
        </td>
    </tr>
}
