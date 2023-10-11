import {React, useState} from "react";
import { useLocation } from "react-router";
import ObjectAdress from "component-tool/ObjectAdress";

export default function Tool() {
    const location = useLocation();
    let state = location.state;

    const [selectTool, setSelectTool] = useState();
    const [selectObject, setSelectObject] = useState();

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
                            {"Tool:/"}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={SIDE_STYLE}>
                        {"(대충 근사한 프로퍼티 리스트)"}
                    </td>
                    <td style={CENTER_STYLE}>
                        {"(대충 근사한 커스텀 그래프 관계도)"}
                    </td>
                    <td style={SIDE_STYLE}>
                        <ObjectAdress/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}