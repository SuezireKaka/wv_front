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
export default function Showcase2() {

    //const { page, setPage } = useContext(ShowcaseContext)
    
    const param = useParams()
    const [nowGenre, setNowGenre] = useState();
    const [ page, setPage ] = useState(1);
    const { genreCodeList } = useContext(AppContext);
    //const location = useLocation();
    //let state = location.state;
    const initGenre = useState();
	const navigate = useNavigate();
    
    useEffect((e) => {
        console.log("showcase 변화에 따른 이전 페이징 값 1로 초기화", page);
        window.scrollTo({ top: 0 });
        setPage(1)
        console.log(page)
      },[param.boardId])
  
    const onChange = async (genId,index)=> {
        console.log(genId)
        setNowGenre(genreCodeList[index])
        console.log(nowGenre)
        setPage(1)
        navigate(`/board/${param.boardId}/${genId}`)
        //return <></>
        //<Link key={gen.id}  to={`/board/${param.boardId}/${gen.id}`}></Link>
        
    }

    function GenreSelector({ initGenre, onChange = f => f }) {
        return <>

        <button onClick={(_,index) => onChange(_,null)}>전체</button>
            
            {genreCodeList?.map((gen,index) => <>
                
                <button onClick={() => onChange(gen.id,index)}>{gen?.genre}</button>
            </>)}
            </>
    }

    return <>
        <GenreSelector initGenre={initGenre} onChange={onChange}/>
        <ShowcaseList  board={param?.boardId} initPage={page} />
    </>
}
