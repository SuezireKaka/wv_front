import ToolDetail from 'component-tool/ToolDetail';
import ToolContext from './ToolContextProvider';
import { useContext, useEffect } from 'react';

export default function ToolData({ data }) {
    console.log("데이터는 나와?", data)
    const { nowName, setNowName,
        setXToolSize, setYToolSize,
        setInitVertices, setInitEdges,
        setNowVertices, setNowEdges
    } = useContext(ToolContext);

    useEffect(() => {
        setNowName(data?.name);
        setXToolSize(data?.xToolSize);
        setYToolSize(data?.yToolSize);
        setInitVertices(data?.customEntityList);
        setNowVertices(data?.customEntityList);
        setInitEdges(data?.customRelationList);
        setNowEdges(data?.customRelationList);
    }, [])


    return <>
        <h2>{nowName}</h2>
        <br />
        <ToolDetail />
    </>
}
