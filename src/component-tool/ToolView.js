import ToolDetail from 'component-tool/ToolDetail';
import { useState, useRef, useEffect, useContext } from 'react';
import { AxiosAuth } from 'toolbox/Fetch';
import { useLocation } from "react-router";
import AppContext from "context/AppContextProvider";

export default function ToolView() {
    const { auth } = useContext(AppContext);

    const location = useLocation();
    const state = location.state;

    console.log("지금 상태 줘!", state)

    const TOOL_DETAILS_URL = "/tool/anonymous/getToolById/";

    

    return <p>공사중입니다!</p>
}