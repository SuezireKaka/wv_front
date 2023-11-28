import { displayDate } from "toolbox/DateDisplayer";
import { Link } from "react-router-dom";
import { useState } from "react";
import NumberInput, { minmax } from "toolbox/NumberInput";

export const [X_MIN_TOOLSIZE, Y_MIN_TOOLSIZE, X_MAX_TOOLSIZE, Y_MAX_TOOLSIZE] = [500, 300, 1500, 1500]

export default function ToolManager({
    index, tool = {name : "", xToolSize : X_MIN_TOOLSIZE, yToolSize : Y_MIN_TOOLSIZE}, state,
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

    function onChange(e, callback = f => f) {
        callback(e.target.value)
    }

    function onBlur(e, min, max, callback = f => f) {
        callback(minmax(e.target.value, min, max))
    }

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
            <NumberInput
                min={X_MIN_TOOLSIZE} max={X_MAX_TOOLSIZE}
                value={nowXToolSize}
                onChange={(e) => onChange(e, setNowXToolSize)}
                onBlur={(e) => onBlur(e, X_MIN_TOOLSIZE, X_MAX_TOOLSIZE, setNowXToolSize)}
            />
            {" X "}
            <NumberInput
                min={Y_MIN_TOOLSIZE} max={Y_MAX_TOOLSIZE}
                value={nowYToolSize}
                onChange={(e) => onChange(e, setNowYToolSize)}
                onBlur={(e) => onBlur(e, Y_MIN_TOOLSIZE, Y_MAX_TOOLSIZE, setNowYToolSize)}
            />
        </td>
        <td></td>
        <td>
            <button onClick={() => {
                console.log("원래 툴은 이거였어", tool)
                // 왜 자바 프로퍼티명은 xToolSize인데 받는 건 xtoolSize로 받음? 어이없어 정말
                console.log("지금부터 이걸로 변경을 시도한다", {...tool, name : nowName, xtoolSize : Number(nowXToolSize), ytoolSize : Number(nowYToolSize)})
                onManage({...tool, name : nowName, xtoolSize : Number(nowXToolSize), ytoolSize : Number(nowYToolSize)})
            }}>
                저장
            </button>
            {" : "}
            <button onClick={() => {console.log("취소가 먼저거든?"); onCancel(index)}}>취소</button>
        </td>
    </tr>
}
