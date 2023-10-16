import {React, useState} from "react";
import { Fetch } from "toolbox/Fetch";
import ToolButton from "./ToolButton";

export default function ObjectAdress({toolset = [], onSelect = f => f}) {

    console.log(toolset)

    return <div>
        {toolset.map(tool => {
            return <li>
                <ToolButton tool={tool} onSelect={onSelect}>{tool.name}</ToolButton>
            </li>
            })
        }
    </div>
}