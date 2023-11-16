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
    console.log(postList)
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
    const [listAttachFile] = useState([])
    const [byKeyWord, setByKeyWord] = useState(false);
    const [isSeries, setIsSeries] = useState(true);

    const txtSearch = useRef();
  

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
    }, [param.boardId])

    const onChange = async (genId, index) => {
        console.log(genId)
        setNowGenre(genreCodeList[index])
        setPage(1)
        setPostList([])
        navigate(`/board/${param.boardId}/${genId}`)

    }

    function GenreSelector({ initGenre, onChange = f => f }) {
        return <>
            <button onClick={(_, index) => onChange("", null)}>전체</button>
            {genreCodeList?.map((gen, index) => <>
                <button onClick={() => onChange(gen.id, index)}>{gen?.genre}</button>
            </>)}
        </>
    }

    console.log(nowGenre)

    return <>
        <GenreSelector initGenre={initGenre} onChange={onChange} />
        <ShowcaseList board={param?.boardId} page={page} setPage={setPage}
            postList={postList} setPostList={setPostList}
            lastIntersectingImage={lastIntersectingImage} 
            setLastIntersectingImage={setLastIntersectingImage}
            listAttachFile={listAttachFile}
            setByKeyWord={setByKeyWord}
            isSeries={isSeries}
            txtSearch={txtSearch}
            onSearch={onSearch}
        />
    </>
}
