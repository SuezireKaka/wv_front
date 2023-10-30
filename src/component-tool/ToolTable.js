import {React, useState} from "react";
import ObjectAddress from "component-tool/ObjectAddress";
import ToolFrame from "component-tool/ToolFrame";
import PropArea from "component-tool/PropArea";

export default function ToolTable({toolset, style}) {

    const DEFAULT_ADDRESS = "Tool:/"

    const [nowToolsArray, setNowToolsArray] =  useState(toolset);
    const [nowAddress, setNowAddress] = useState(DEFAULT_ADDRESS);
    
    const SIDE_STYLE = {
        width: "25%",
        border: "1px solid",
        verticalAlign: "top"
    }
    const CENTER_STYLE = {
        width: "50%",
        border: "1px solid"
    }

    return <table style={style}>
        <tbody>
            <tr style={{...CENTER_STYLE, textAlign : "left"}}>
                <td rowSpan={2} style={{...CENTER_STYLE, textAlign : "left", width : "20%"}}>
                    <ObjectAddress toolset={nowToolsArray} />
                </td>
                <td colSpan={2} style={CENTER_STYLE}>
                    <div style={{margin : "10px"}}>
                        {nowAddress}
                    </div>
                </td>
            </tr>
            <tr>
                <p>여기엔 뭐가 들어갈까?</p>
            </tr>
        </tbody>
    </table>
}