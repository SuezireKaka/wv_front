import ToolDetail from 'component-tool/ToolDetail';
import { useState, useRef, useEffect, useContext } from 'react';
import { AxiosAuth } from 'toolbox/Fetch';
import { useLocation, useParams } from "react-router";
import AppContext from "context/AppContextProvider";

export default function ToolView() {
    const { auth } = useContext(AppContext);

    const location = useLocation();
    const state = location.state;
    const param = useParams();

    console.log("지금 상태 줘!", state)
    console.log("파란색 보여 줘!", param)

    const TOOL_DETAILS_URL = "/tool/getToolById/";

    return <p>공사중입니다!</p>
}