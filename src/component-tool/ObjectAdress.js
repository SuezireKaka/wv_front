import {React, useState} from "react";
import { Fetch } from "toolbox/Fetch";
import ToolButton from "./ToolButton";

export default function ObjectAdress({seriesId, onSelect = f => f}) {

    const [nowPage, setNowPage] = useState(1);

    console.log(seriesId)

    const DEFAULT_TOOLSET_URL = `http://localhost:8080/tool/anonymous/listAllFromSeries/${seriesId}/${nowPage}`

    function getDefaultTools(toolPage) {
        console.log("여기가 어디니?")
        console.log(toolPage)
        
        return <div>
            {toolPage.length == 0
            ? "로딩중....................."
            : toolPage.firstVal.length == 0
            ? "(제작된 툴이 없습니다)"
            : toolPage.firstVal.map(tool => {
                return <li>
                    <ToolButton tool={tool} onSelect={onSelect}>{tool.name}</ToolButton>
                </li>
                })
            }
        </div>
    }

    return <Fetch uri={DEFAULT_TOOLSET_URL} renderSuccess={getDefaultTools}/>
}