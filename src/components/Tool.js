import {React, useState} from "react";
import { useLocation } from "react-router";
import ObjectAdress from "component-tool/ObjectAdress";
import ToolFrame from "component-tool/ToolFrame";
import { Fetch } from "toolbox/Fetch";
import CustomPropertyList from "component-tool/CustomPropertyList";

export default function Tool() {
    const location = useLocation();
    let state = location.state;

    const DEFAULT_ADDRESS = "Tool:/"

    const [nowAddress, setNowAddress] = useState(DEFAULT_ADDRESS);
    const [selectedTool, setSelectedTool] = useState();
    const [toolset, setToolset] = useState([]);
    const [selectedObject, setSelectedObject] = useState();

    console.log("누구세요", state)

    const DEFAULT_TOOLSET_URL = `http://localhost:8080/tool/anonymous/listAllFromSeries/${state.seriesId}/1`

    function onSelectTool(tool) {
        setNowAddress(DEFAULT_ADDRESS + selectedTool?.name)
        setSelectedTool(tool)
    }
    
    function onSelectObj(obj) {
        setSelectedObject(obj)
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
                        <button>현재 툴 저장</button>
                        <button>모두 저장</button>
                    </td>
                </tr>
                <tr>
                    <td style={{...SIDE_STYLE, textAlign : "left"}}>
                        <div style={{margin : "10px"}}>
                            <Fetch uri={DEFAULT_TOOLSET_URL} renderSuccess={(toolset) => {
                                console.log(toolset)
                                return <ObjectAdress toolset={toolset.firstVal} onSelect={onSelectTool}/>
                            }}/>
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
                    <td style={SIDE_STYLE}>
                        <CustomPropertyList selected={selectedObject}/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}