import { Fetch } from "toolbox/Fetch";
import { useLocation } from "react-router";
import SeriesTable from "../component-showcase/SeriesTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import SeriesCard from "component-showcase/SeriesCard";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRef } from "react";
import ThumbnailList from "atom/ThumbnailList";
import OriginalViewList from "atom/OriginalViewList";

export default function ShowcaseList() {

    const [page, setPage] = useState(1);
    const location = useLocation();
    let state = location.state;
    let [listAttachFile, setListAttachFile] = useState([]);
    console.log("==========")
    console.log(state);
    console.log(state);
    const LIST_ALL_SERIES_URI = `/work/anonymous/listAllSeries/${state?.boardId}/1`
    const [postListUri, setPostListUri] = useState(`/post/anonymous/listAll/${state?.boardId}/${page}`);
    const txtSearch = useRef("");
    const [byKeyWord, setByKeyWord] = useState(false);

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
            setPostListUri(postSearchListUri);
        } else {
            setByKeyWord(false)
            setPostListUri(`/work/anonymous/listAll/${state?.boardId}/${page}`);
        }

    };
    


    const renderSuccess = (data) =>{
        console.log(data)
        return <>

        <SeriesCard data={data.firstVal} state={{seriesId:state.seriesId, state, parentId : "", boardId:state.boardId, post: { boardVO: { id: state.boardId }}}}/>{console.log(data.firstVal)}
        
        </>
    }
    




    return <div>
        <br/>
        <div className="Question">
            <form>
                <label>검색 :</label> {" "}
                {/* <input placeholder="찾으시는 제목을 입력하세요" type="text"/> */} {" "}
                <input placeholder="검색어" ref={txtSearch}></input>
                <button onClick={onSearch}>검색</button>
            </form>
        </div> 
        <br/>


            <Link to={`/series/mng`} state={{seriesId:state.seriesId, state, parentId : "", boardId:state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile:[] }}}>
                <button>신규</button><br/><br/>
            </Link>
            <Container>
                    <Row>

                <Fetch uri={LIST_ALL_SERIES_URI} renderSuccess={renderSuccess}/>
                    </Row>
    </Container>
    </div>
}
  