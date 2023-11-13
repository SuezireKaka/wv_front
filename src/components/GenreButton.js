import React from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Fetch } from 'toolbox/Fetch'
import AppContext from 'context/AppContextProvider'
import { useContext } from 'react'
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function GenreButton({ txtSearch, onSearch = f => f }) {
    const { genreCodeList } = useContext(AppContext);
    const location = useLocation();
    let state = location.state;
    console.log(state);

    const navMenu = {
        color: "grey",
        textDecoration: "none",
    
      }
    function renderGenre(data,gen) {
      
        console.log(gen)
        return (
            <Dropdown.Item eventKey={gen?.id}>
            <Link style={navMenu} class="jb-nav" key={gen?.id}  to={`/board/${state.boardId}/${gen?.id}`}
                state={{  post: state?.post, page: 1, boardId: state?.boardId, genId:gen?.id }}>{gen?.genre}</Link>
            </Dropdown.Item>
        )
    }


        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                        장르
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="0"> <Link style={navMenu} class="jb-nav" to={`/board/${state.boardId}`}
                        state={{  post: state?.post, page: 1, boardId: state?.boardId }}>전체</Link></Dropdown.Item>
                        <Dropdown.Divider />
                        {genreCodeList?.map((gen) => <>
                            <Fetch uri={`/work/anonymous/listAllSeries/${state?.boardId}/${state?.page}?genreId=${gen.id}`} renderSuccess={(data)=>renderGenre(data,gen)} />
                        </>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )

   

}
