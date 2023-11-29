import React, { useContext, useState, useEffect, useRef } from 'react'
import ShowcaseList from './ShowcaseList'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom';
import AppContext from 'context/AppContextProvider'
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiArrowToTop, BiArrowToBottom  } from "react-icons/bi";
export default function Showcase() {
    const param = useParams()
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
    const [listAttachFile] = useState([])
    const [byKeyWord, setByKeyWord] = useState(false);
    const [isSeries, setIsSeries] = useState(true);

    const txtSearch = useRef(null);
    const onSearch = (e) => {
        const search = txtSearch.current.value;
        window.scrollTo({ top: 0 });
        e.preventDefault();
        setPostList([]);
        setPage(1);
        console.log(search);
        
    };

    useEffect((e) => {
        console.log("showcase 변화에 따른 이전 페이징 값 1로 초기화", page);
        window.scrollTo({ top: 0 });
        setPage(1)
        setPostList([])
        console.log(page)
    }, [param.boardId, param.genreId])

    const onTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0 });
      }
      const onBottom = (e) => {
        e.preventDefault();
        window.scrollTo(0, document.body.scrollHeight);
      }
    

    function GenreCanvas() {
        const { genreCodeList } = useContext(AppContext);
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return <div> <>
            <Button variant="outline-warning" onClick={handleShow}>
                장르
            </Button>

            <Offcanvas show={show} onHide={handleClose} style={{backgroundColor: "#ead4bb"}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>장르검색</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body><b>
                    <Link style={{ all: "unset", cursor: "pointer",fontSize:"30" }} key={param.boardId} to={`/board/${param.boardId}`}>전체</Link>&nbsp;&nbsp;<br />
                    {genreCodeList?.map((gen) => <>
                        <Link style={{ all: "unset", cursor: "pointer" }} key={gen.id} to={`/board/${param.boardId}/${gen.id}`}>{gen?.genre}</Link>&nbsp;&nbsp;<br />
                    </>)}</b>
                </Offcanvas.Body>
            </Offcanvas>
        </></div>
    }

    return <>
          <div style={{ position: "fixed", zIndex: "2", opacity: 0.6, overflow: "auto", right: "5%", top: "33%"}}>
          <Button variant="outline-danger" onClick={(e) => onTop(e)}><BiArrowToTop /></Button><br/><br/>
          <Button variant="outline-danger" onClick={(e) => onBottom(e)}><BiArrowToBottom /></Button>
      </div>
        <ShowcaseList board={param?.boardId} page={page} setPage={setPage}
            postList={postList} setPostList={setPostList}
            lastIntersectingImage={lastIntersectingImage}
            setLastIntersectingImage={setLastIntersectingImage}
            listAttachFile={listAttachFile}
            byKeyWord={byKeyWord} setByKeyWord={setByKeyWord}
            isSeries={isSeries}
            onSearch={onSearch}
            txtSearch={txtSearch}
            GenreCanvas={GenreCanvas}
           
        />
    </>
}
