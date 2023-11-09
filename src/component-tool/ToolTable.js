import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ToolManager from "./ToolManager";
import ToolSkin from "./ToolSkin";
import { Table, Button } from 'react-bootstrap';
import { Pagination } from "react-bootstrap";
import { displayPagination } from "toolbox/Pagination";
import Remocon from "toolbox/Remocon";

export default function ToolTable({
    data, state,
    setToolListUri = f => f, buildUrl = f => f,
    setData = f => f, manageToolSkin = f => f }) {
    console.log("그래서 뭘 테이블로 만들면 돼?", data)

    const address = `Tool:/${state?.addr}`

    const [nowFunc, setNowFunc] = useState(0)
    const [nowFuncName, setNowFuncName] = useState("선택")

    const [selectedId, setSelectedId] = useState()

    function onDetermine(index, newTool) {
        let newData = [...data.firstVal]
        newData[index] = newTool ? { ...newTool, isEditing: false } : { ...newData[index], isEditing: false }
        setNowFunc(1)
        setNowFuncName("선택")
        setData({ ...data, firstVal: newData })
    }

    function onManage(index, newTool) {
        console.log("저장하려는 데이터는?", { ...newTool, isEditing: false })
        onDetermine(index, newTool)
        manageToolSkin(newTool)
    }

    function onCancel(index) {
        onDetermine(index)
    }

    function onSelect(index, name) {
        setNowFunc(index)
        setNowFuncName(name)
        setSelectedId()
    }

    function onExecute(tool, index) {
        let newData = [...data.firstVal]
        switch (nowFuncName) {
            case "생성":
                newData.unshift({id : state?.toolId + "----", name : "", xToolSize : 100, yToolSize: 100, isEditing : true})
                setData({ ...data, firstVal: newData })
                break
            case "수정":
                newData[index].isEditing = true
                setData({ ...data, firstVal: newData })
                break
            default:
        }
    }

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const ADDRESS_STYLE = {
        backgroundColor: "#526290",
        color: "#ffffcc"
    }

    console.log("툴들 보여줘!", data)
    const toolset = data?.firstVal;
    const pagenation = data?.secondVal;

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
        <thead>
            <tr><th colSpan={4} style={{ ...TABLE_STYLE, textAlign: "left", ...ADDRESS_STYLE }}> ★ {address}</th></tr>
            <tr><td colSpan={4} style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <Remocon index={nowFunc} type="xpl" onSelect={onSelect} />
            </td></tr>
            <tr><td colSpan={4} style={{ ...TABLE_STYLE }}>
                <div style={{ display: "inline-block" }}>
                    <Pagination>
                        {pagenation?.lastPage >= 2
                            ? <>{displayPagination(pagenation, state, setToolListUri, buildUrl)}<br /></>
                            : ""}
                    </Pagination>
                </div>
            </td></tr>
            <tr style={{ ...TABLE_STYLE, textAlign: "center", }}>
                <th>이름</th>
                <th>크기</th>
                <th>수정시간</th>
                <th></th>
            </tr>
        </thead>
        {toolset && toolset.length > 0
            ? toolset.map((tool, index) =>
                tool.isEditing
                    ? <ToolManager key={index}
                        tool={tool}
                        state={state}
                        onManage={(newTool) => onManage(index, newTool)}
                        onCancel={() => onCancel()}
                    />
                    : <ToolSkin key={index}
                        tool={tool}
                        state={state}
                        onClick={tool => onExecute(tool, index)}
                        onLink={() => {
                            state.addr = tool.name;
                            setToolListUri(buildUrl())
                        }}
                    />
            ) : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <td colSpan={4}>{"(이 위치에는 선택 가능한 툴이 존재하지 않습니다.)"}</td>
            </tr>}
    </Table>
}