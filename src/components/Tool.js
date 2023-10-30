import { useLocation } from "react-router";
import { AxiosAuth, Fetch } from "toolbox/Fetch";
import ToolTable from "component-tool/ToolTable";
import Axios from "api/axios";
import { useContext } from "react";
import AppContext from "context/AppContextProvider";

export default function Tool() {
    const {auth} = useContext(AppContext);
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
        <AxiosAuth uri={DEFAULT_TOOLSET_URL} auth={auth} renderSuccess={(_, res) => {
            console.log("이것이 모든 일의 시작이었다...", res)
            return <ToolTable toolset={res?.data?.firstVal} style={TABLE_STYLE}></ToolTable>
        }}/>
    </div>
}