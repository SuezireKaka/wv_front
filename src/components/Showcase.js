import React, { useContext, useState } from 'react'
import ShowcaseList from './ShowcaseList'
//import GenreSelector from './GenreSelector'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import AppContext from 'context/AppContextProvider'
import axios from 'api/axios'
import { useEffect } from 'react'
import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import GenreCanvas from './GenreCanvas';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Showcase() {

    //const { page, setPage } = useContext(ShowcaseContext)

    const param = useParams()
    const [nowGenre, setNowGenre] = useState();
    const [page, setPage] = useState(1);
    const { genreCodeList } = useContext(AppContext);
    //const location = useLocation();
    //let state = location.state;
    const initGenre = useState();
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    //console.log(postList)
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


    const navMenu = {
        color: "grey",
        textDecoration: "none",
    
      }

    useEffect((e) => {
        console.log("showcase 변화에 따른 이전 페이징 값 1로 초기화", page);
        window.scrollTo({ top: 0 });
        setPage(1)
        setPostList([])
        console.log(page)
    }, [param.boardId, param.genreId])



    const onChange = async (genId) => {
        console.log("온체인지클릭")
        setPage(1)
        setPostList([])
        navigate(`/board/${param.boardId}/${genId}`)
    }

    function GenreSelector({ initGenre, onChange = f => f }) {
        return <>

            <Button variant="outline-dark" onClick={(_) => onChange("")} size="sm">전체</Button>&nbsp;
            {genreCodeList?.map((gen) => <>
                <Button variant="outline-dark" onClick={() => onChange(gen.id)} size="sm">{gen?.genre}</Button>&nbsp;
            </>)}

        </>
    }

    function GenreCanvas() {
        const { auth } = useContext(AppContext);
        const { genreCodeList } = useContext(AppContext);
        const location = useLocation();
        const state = location.state;
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return <div> <>
            <Button variant="outline-warning" onClick={handleShow}>
                장르
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>장르검색</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body><b>
                    <Link style={{ all: "unset", cursor: "pointer" }} key={param.boardId}to={`/board/${param.boardId}`}>전체</Link>&nbsp;&nbsp;<br/>
                    {genreCodeList?.map((gen) => <>
                        <Link style={{ all: "unset", cursor: "pointer" }} key={gen.id} to={`/board/${param.boardId}/${gen.id}`}>{gen?.genre}</Link>&nbsp;&nbsp;<br/>
                    </>)}</b>
                </Offcanvas.Body>
            </Offcanvas>
        </></div>
    }

    //console.log(nowGenre)

    return <>
        {/*<GenreSelector initGenre={initGenre} onChange={onChange} />*/}
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
            onChange={onChange}
        />
    </>
}
