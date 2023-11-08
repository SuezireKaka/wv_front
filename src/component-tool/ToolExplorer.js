import { useLocation } from "react-router";
import { useContext, useState, useEffect } from "react";
import AppContext from "context/AppContextProvider";
import ToolTable from "./ToolTable";
import axios from 'api/axios';

export default function ToolExplorer() {
    const { auth } = useContext(AppContext);

    const location = useLocation();
    const state = location.state;

    const getDefaultToolsetUrl = state => `http://localhost:8080/tool/listAllFromSeries/${state?.seriesId}/${state?.page}`
    const getAddressToolsetUrl = state => `http://localhost:8080/tool/listAllNextTools/${state?.toolId}/${state?.page}`

    const [toolListUri, setToolListUri] = useState(buildUrl());

    const [nowData, setNowData] = useState()

    function buildUrl() {
        console.log("url 만드는 기준이 뭐야?", state)
        if (state?.toolId)
            return getAddressToolsetUrl(state)
        else
            return getDefaultToolsetUrl(state)
    }

    useEffect(() => {
        axios.get(buildUrl(), {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `Bearer ${auth?.accessToken}`
            }
        }).then(res => setNowData({ ...res?.data }))
    }, [])


    useEffect(() => {
        axios.get(buildUrl(),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }).then(res => {
                setNowData({ ...res?.data })
            })
    }, [toolListUri])

    console.log("로케이션 상태 보여줘!", state)
    console.log("보낸 주소 보여줘!", toolListUri) // 너가 왜 안 바뀌냐고오

    return <div>
        <br />
        <ToolTable
            data={nowData}
            state={state}
            setToolListUri={setToolListUri}
            buildUrl={buildUrl}
            setData={setNowData}
        />
    </div>
}