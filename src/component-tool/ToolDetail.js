import { useState, useRef, useMemo, useEffect } from 'react';
import GraphCanvas from "../example/GraphCanvas"
import PropAccordion from '../example/PropAccordion';

export default function ToolDetail({
    name, xToolSize, yToolSize,
    setXToolSize = f => f, setYToolSize = f => f,
    initVertices = [], setInitVertices = f => f,
    nowVertices = [], setNowVertices = f => f,
    initEdges = [], setInitEdges = f => f,
    nowEdges = [], setNowEdges = f => f,
    nowObjectList = [], setNowObjectList = f => f,
    onSummonObject = f => f, onDeleteAllObjects = f => f, onUpdate = f => f,
}) {

    console.log("이제 뭐 해야 해?", nowObjectList)

    return <>
        {name ? <>
            <br />
            <p>{name}</p>
        </>
            : null}
        <br />
        <table>
            <td style={{ width: xToolSize + 100 }}>
                <GraphCanvas
                    xToolSize={xToolSize} yToolSize={yToolSize}
                    initVertices = {initVertices} setInitVertices = {setInitVertices}
                    nowVertices = {nowVertices} setNowVertices = {setNowVertices}
                    initEdges = {initEdges} setInitEdges = {setInitEdges}
                    nowEdges = {nowEdges} setNowEdges = {setNowEdges}
                    onSummonObject={onSummonObject}
                    onDeleteAllObjects={onDeleteAllObjects}
                />
            </td>
            <td style={{ width: "100%" }}>
                <PropAccordion
                    nowObjectList={nowObjectList} onUpdate={onUpdate}
                />
            </td>
        </table>
    </>
}
