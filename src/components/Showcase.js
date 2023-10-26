import { Fetch } from "toolbox/Fetch";
import { useLocation } from "react-router";
import SeriesTable from "../component-showcase/SeriesTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import SeriesCards from "component-showcase/SeriesCards";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRef } from "react";
import ThumbnailList from "atom/ThumbnailList";
import OriginalViewList from "atom/OriginalViewList";
import axios from "api/axios";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";


export default function ShowcaseList() {

    const [page, setPage] = useState(1);
    const location = useLocation();
    let state = location.state;
    let [listAttachFile, setListAttachFile] = useState([]);
    console.log("==========")
    console.log(state);
    console.log(state);
    const LIST_ALL_SERIES_URI = `/work/anonymous/listAllSeries/${state?.boardId}/${page}`
    const [seriesListUri, setSeriesListUri] = `/work/anonymous/listAllSeries/${state?.boardId}/${page}`
    const txtSearch = useRef("");
    const [byKeyWord, setByKeyWord] = useState(false);

    const [postList, setPostList] = useState([]);

 
    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }
    
    
    
    const onSearch = (e) => {
        const search = txtSearch.current.value;
        e.preventDefault();
        setPage(1);
        console.log(search);
        if(search.trim()){
            setByKeyWord(true)
            const postSearchListUri = `/work/anonymous/search/${state?.boardId}/${search}/${page}`;
            setSeriesListUri(postSearchListUri);
        } else {
            setByKeyWord(false)
            setSeriesListUri(`/work/anonymous/listAllSeries/${state?.boardId}/${page}`);
        }

    };

    return <div>
        <br/>
        <div className="Question">
            <form>
                <input placeholder="검색어" ref={txtSearch}></input>
                <button onClick={onSearch}>검색</button>
            </form>
        </div> 
        <br/>
            <Link to={`/series/mng`} state={{seriesId:state.seriesId, state, parentId : "", boardId:state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile:[] }}}>
            <Button variant="outline-primary">신규</Button><br/><br/>
            </Link>
            <SeriesCards state={{seriesId:state.seriesId, state, parentId : "", boardId:state.boardId, post: { boardVO: { id: state.boardId }}}}/>
    </div>
}
  