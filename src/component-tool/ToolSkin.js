import { displayDate } from "toolbox/DateDisplayer";
import { Link } from "react-router-dom";

export default function ToolSkin({ tool, state }) {
    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    return <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
        <td>{tool.name}</td>
        <td>
            <Link to={`/series/${state.seriesId}/tool/${tool.id}`}
                state={{ seriesId: state.seriesId, page: 1, addr: tool.id }}
            >
                <button>하위 툴</button>
            </Link>
            {" : "}
            <Link to={`/series/${state.seriesId}/tool/${tool.id}`}
                state={{ seriesId: state.seriesId, page: state.page, addr: tool.id }}
            >
                <button>펼쳐보기</button>
            </Link>
        </td>
        <td>{tool.xToolSize + " X " + tool.yToolSize}</td>
        <td>{displayDate(tool.regDt, tool.uptDt)}</td>
    </tr>
}
