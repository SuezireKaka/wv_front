import {React, useState} from "react";
import { useLocation } from "react-router";
import ObjectAdress from "component-tool/ObjectAdress";
import ToolFrame from "component-tool/ToolFrame";

export default function Tool() {
    const location = useLocation();
    let state = location.state;

    const DEFAULT_ADDRESS = "Tool:/"

    const [nowAddress, setNowAddress] = useState(DEFAULT_ADDRESS);
    const [selectedTool, setSelectedTool] = useState();
    const [tools, setTools] = useState([]);
    const [selectedObject, setSelectedObject] = useState();

    function onSelect(tool) {
        setNowAddress(DEFAULT_ADDRESS + tool.name)
        setSelectedTool(tool)
    }

    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }
    const SIDE_STYLE = {
        width: "25%",
        border: "1px solid"
    }
    const CENTER_STYLE = {
        width: "50%",
        border: "1px solid"
    }

    console.log(state);

    return <div>
        <br/>
        <table style={TABLE_STYLE}>
            <tbody>
                <tr style={{...CENTER_STYLE, textAlign : "left"}}>
                    <td colSpan={3} style={CENTER_STYLE}>
                        <div style={{margin : "10px"}}>
                            {nowAddress}
                        </div>
                    </td>
                </tr>
                <tr style={{...CENTER_STYLE, textAlign : "right"}}>
                    <td colSpan={3} style={CENTER_STYLE}>
                        <button>모두 저장</button>
                    </td>
                </tr>
                <tr>
                    <td style={{...SIDE_STYLE, textAlign : "left"}}>
                        <div style={{margin : "10px"}}>
                            <ObjectAdress seriesId={state.seriesId} onSelect={onSelect}/>
                        </div>
                    </td>
                    <td style={CENTER_STYLE}>
                        <div style={{margin : "10px"}}>
                            {selectedTool ?
                            <ToolFrame tool={selectedTool}/>
                            : "(선택된 툴이 없습니다)"
                            }
                        </div>
                    </td>
                    <td style={SIDE_STYLE}>
                        {"(대충 근사한 프로퍼티 리스트)"}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}