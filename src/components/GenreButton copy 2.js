import React from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Fetch } from 'toolbox/Fetch'
import AppContext from 'context/AppContextProvider'
import { useContext } from 'react'
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function GenreButton({ onSearch = f => f, page, setPage = f => f }) {
    const { genreCodeList } = useContext(AppContext);
    const location = useLocation();
    let state = location.state;

    const navMenu = {
        color: "grey",
        textDecoration: "none",

    }
    /*
    function renderGenre() {
  
        return (
            
            //<Fetch uri={`/work/anonymous/listAllSeries/${state?.boardId}/${page}?genreId=${gen.id}`} renderSuccess={(data) => renderGenre(data, gen)} />
        ) //onClick={e=>setPage(1)} 
    }*/

    return (
        <div>
            <Link style={navMenu} key={state?.boardId} to={`/board/${state?.boardId}`}
                state={{ boardId: state?.boardId, page: 1 }}>[전체]</Link>
            {genreCodeList?.map((gen) => <>
                <Link style={navMenu} key={gen?.id} to={`/board/${state?.boardId}/${gen?.id}`}
                    state={{ post: state?.post, page: 1, boardId: state?.boardId, genId: gen?.id }} >[{gen?.genre}]</Link>
            </>)}

        </div>
    )
}
