import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AxiosAuth, Fetch } from "toolbox/Fetch";
import Axios from "api/axios";
import { useContext, useState } from "react";
import AppContext from "context/AppContextProvider";
import ToolSkin from "./ToolSkin";
import { Table, Button } from 'react-bootstrap';
import { Pagination } from "react-bootstrap";
import { displayPagination } from "toolbox/Pagination";

export default function ToolExplorer() {
    const { auth } = useContext(AppContext);

    const location = useLocation();
    const state = location.state;

    console.log("지금 상태 줘!", state)

    const address = `Tool://${state.addr}`

    const getDefaultToolsetUrl = state => `http://localhost:8080/tool/anonymous/listAllFromSeries/${state?.seriesId}/${state?.page}`
    const getAddressToolsetUrl = state => `http://localhost:8080/tool/anonymous/listAllNextTools/${state?.addr}/${state?.page}`

    const [toolListUri, setToolListUri] = useState(buildUrl(222));

    function buildUrl(tttt) {
        if (state?.addr)
            return getAddressToolsetUrl(state)
        else
            return getDefaultToolsetUrl(state)
    }

    const TABLE_STYLE = {
        border: "1px solid",
        borderCollapse: "collapse"
    }

    const TABLE_HEAD_STYLE = {
        backgroundColor: "#aacc99"
    }

    console.log("로케이션 상태 보여줘!", state)
    console.log("보낼 주소 보여줘!", toolListUri)

    return <div>
        <br />
        <Fetch uri={buildUrl(state)} renderSuccess={(res) => {
            console.log("툴들 보여줘!", res)
            const pagenation = res?.secondVal;

            return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
                <thead>
                    <tr><th colSpan={4} style={{ ...TABLE_STYLE, textAlign: "left", ...TABLE_HEAD_STYLE }}> ★ {address}</th></tr>
                    <tr><td colSpan={4} style={{ ...TABLE_STYLE, textAlign: "center" }}>툴 리모콘 공사중</td></tr>
                    <tr style={{ ...TABLE_STYLE, textAlign: "center", }}>
                        <th>이름</th>
                        <th></th>
                        <th>크기</th>
                        <th>수정시간</th>
                    </tr>
                </thead>
                {res.firstVal && res.firstVal.length > 0
                    ? res.firstVal.map((tool, index) => <ToolSkin key={index} tool={tool} state={state} />)
                    : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                        <td colSpan={4}>{"(이 위치에는 선택 가능한 툴이 존재하지 않습니다.)"}</td>
                    </tr>}
                <tr><td colSpan={4} style={{ ...TABLE_STYLE, textAlign: "center" }}>
                    <Pagination>
                        {pagenation?.lastPage >= 2
                            ? <>{displayPagination(pagenation, state, setToolListUri, buildUrl)}<br /></>
                            : ""}
                    </Pagination>
                </td></tr>
            </Table>
        }} />
    </div>
}