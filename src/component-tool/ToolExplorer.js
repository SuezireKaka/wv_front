import { useLocation, useParams } from "react-router";
import { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "context/AppContextProvider";
import ToolTable from "./ToolTable";
import axios from 'api/axios';

export default function ToolExplorer() {
    const { auth } = useContext(AppContext);

    const location = useLocation();
    const param = useParams();
    const state = location.state;

    const TOOLSKIN_MANAGE_URL = "/tool/manageToolSkin/"

    const [toolListUri, setToolListUri] = useState(buildUrl());

    const [nowData, setNowData] = useState()

    function buildUrl() {
        return "http://localhost:8080/tool/listAllNextTools/path" + state?.toolId + "/" + state?.page
    }

    function manageToolSkin(toolSkin) {
        console.log("이 유저가 보냅니다: ", auth)
        let uri = TOOLSKIN_MANAGE_URL + state?.seriesId
        console.log("다음 주소로 보냅니다: ", uri)
        let request = {id : toolSkin.id, name: toolSkin.name, xToolSize: toolSkin.xToolSize, yToolSize: toolSkin.yToolSize}
        console.log("이것을 보냅니다: ", request)
        axios.post(uri, request, {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `Bearer ${auth?.accessToken}`
            }
        }).catch((error) => { console.log(error) })
    }

    useEffect(() => {
        console.log("여기는 언제 들어가? 1111111111111111111111")
        axios.get(buildUrl(), {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `Bearer ${auth?.accessToken}`
            }
        }).then(res => setNowData(readyForEditing(res?.data)))
    }, [])


    useEffect(() => {
        console.log("여기는 언제 들어가? 2222222222222222222222")
        axios.get(buildUrl(),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }).then(res => setNowData(readyForEditing(res?.data)))
    }, [toolListUri, param])

    function readyForEditing(data) {
        return {
            ...data,
            firstVal: data?.firstVal?.map(tool => { return { ...tool, isEditing: false } })
        }
    }


    console.log("로케이션 상태 보여줘!", state)
    console.log("파란색 보여줘!", param)
    console.log("보낸 주소 보여줘!", buildUrl()) // 너가 왜 안 바뀌냐고오

    return <div>
        <br />
        <ToolTable
            data={nowData}
            state={state}
            param={param}
            setToolListUri={setToolListUri}
            buildUrl={buildUrl}
            setData={setNowData}
            manageToolSkin={manageToolSkin}
        />
    </div>
}