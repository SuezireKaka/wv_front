import React from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Fetch } from 'toolbox/Fetch'
import AppContext from 'context/AppContextProvider'
import { useContext } from 'react'
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function GenreButton({page, setPage=f=>f}) {
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
            <Dropdown>
                <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                 장르
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="all000" href={`/board/${state?.boardId}`} >
                        <Link style={navMenu} key={state?.boardId} to={`/board/${state?.boardId}`}
                            state={{ boardId: state?.boardId, page: 1 }}>전체</Link> </Dropdown.Item>
                    <Dropdown.Divider />
                    {genreCodeList?.map((gen) => <>
                        <Dropdown.Item eventKey={gen?.id} href={`/board/${state?.boardId}/${gen?.id}`} >
                        <Link style={navMenu} key={gen?.id} to={`/board/${state?.boardId}/${gen?.id}`}
                                state={{ post: state?.post, page:1, boardId: state?.boardId, genId: gen?.id }} >{gen?.genre}</Link>
                        </Dropdown.Item>
                    </>)}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )



}
