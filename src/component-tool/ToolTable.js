import {React, useState} from "react";
import ObjectAddress from "component-tool/ObjectAddress";
import ToolFrame from "component-tool/ToolFrame";
import PropArea from "component-tool/PropArea";

export default function ToolTable({toolset, style}) {

    const DEFAULT_ADDRESS = "Tool:/"

    const [nowAddress, setNowAddress] = useState(DEFAULT_ADDRESS);
    const [selectedTool, setSelectedTool] = useState();
    const [selectedObject, setSelectedObject] = useState();

    function onSelectTool(tool) {
        setNowAddress(DEFAULT_ADDRESS + tool?.name)
        setSelectedTool(tool)
    }
    
    function onSelectObj(obj) {
        console.log("이제 이것을 선택합니다 :", obj)
        setSelectedObject(obj)
    }

    console.log("지금 이걸 선택했구나?", selectedObject);

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
                <td colSpan={3} style={CENTER_STYLE}>
                    <div style={{margin : "10px"}}>
                        {nowAddress}
                    </div>
                </td>
            </tr>
            <tr style={{...CENTER_STYLE, textAlign : "right"}}>
                <td colSpan={3} style={CENTER_STYLE}>
                    <button>현재 툴 저장</button>
                    <button>모두 저장</button>
                </td>
            </tr>
            <tr>
                <td style={{...SIDE_STYLE, textAlign : "left"}}>
                    <div style={{margin : "10px"}}>
                        <ObjectAddress toolset={toolset.firstVal} onSelect={onSelectTool}/>
                    </div>
                </td>
                <td style={CENTER_STYLE}>
                    <div style={{margin : "10px"}}>
                        {selectedTool ?
                        <ToolFrame tool={selectedTool} onSelect={onSelectObj}/>
                        : "(선택된 툴이 없습니다)"
                        }
                    </div>
                </td>
                <td style={{...SIDE_STYLE}}>
                    <PropArea selected={selectedObject} name={selectedObject?.name}/>
                </td>
            </tr>
        </tbody>
    </table>
}