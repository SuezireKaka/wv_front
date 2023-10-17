import { useLocation } from "react-router";
import { Fetch } from "toolbox/Fetch";
import ToolTable from "component-tool/ToolTable";

export default function Tool() {
    const location = useLocation();
    let state = location.state;

    const DEFAULT_TOOLSET_URL = `http://localhost:8080/tool/anonymous/listAllFromSeries/${state.seriesId}/1`

    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    return <div>
        <br/>
        <Fetch uri={DEFAULT_TOOLSET_URL} renderSuccess={(toolset) => {
            console.log("이것이 모든 일의 시작이었다...", toolset)
            return <ToolTable toolset={toolset} style={TABLE_STYLE}></ToolTable>
        }}/>
    </div>
}