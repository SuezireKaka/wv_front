import { displayDate } from "toolbox/DateDisplayer";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ToolManager({
    tool = {name : "", xToolSize : 100, yToolSize : 100}, state,
    onManage = f => f, onCancel = f => f
}) {
    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    const [nowName, setNowName] = useState(tool.name);
    const [nowXToolSize, setNowXToolSize] = useState(tool.xToolSize);
    const [nowYToolSize, setNowYToolSize] = useState(tool.yToolSize);

    return <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
        <td>
            <input type="text"
                placeholder="툴 이름을 입력하세요"
                maxLength={30}
                value={nowName}
                onChange={e => setNowName(e.target.value)}
            />
        </td>
        <td>
            <input type="number"
                min={100} max={2000}
                value={nowXToolSize}
                onChange={e => setNowXToolSize(e.target.value)}
            />
            {" X "}
            <input type="number"
                min={100} max={2000}
                value={nowYToolSize}
                onChange={e => setNowYToolSize(e.target.value)
            }/>
        </td>
        <td></td>
        <td>
            <button onClick={() => {
                console.log("지금부터 이걸로 변경을 시도한다", {...tool, name : nowName, xToolSize : nowXToolSize, yToolSize : nowYToolSize})
                onManage({...tool, name : nowName, xToolSize : nowXToolSize, yToolSize : nowYToolSize})
            }}>
                저장
            </button>
            {" : "}
            <button onClick={onCancel}>취소</button>
        </td>
    </tr>
}
