import React from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Fetch } from 'toolbox/Fetch'
import AppContext from 'context/AppContextProvider'
import { useContext } from 'react'
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function GenreButton() {
    const { genreCodeList } = useContext(AppContext);
    const location = useLocation();
    let state = location.state;
    const param = useParams();

    const navMenu = {
        color: "grey",
        textDecoration: "none",

    }
    function renderGenre(data, gen) {
        console.log(data)
        console.log(gen)
        return (
            <Fetch uri={`/work/anonymous/listAllSeries/${state?.boardId}/1?genreId=${gen.id}`} renderSuccess={(data) => renderGenre(data, gen)} />
        )
    }


    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                    장르
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="all000" href={`/board/${state?.boardId}/1`}>
                        <Link key="all000" style={navMenu} to={`/board/${state?.boardId}/1`}
                            state={{ post: state?.post, page:1, boardId: state?.boardId }}>전체</Link> </Dropdown.Item>
                    <Dropdown.Divider />
                    {genreCodeList?.map((gen) => <>
                        <Dropdown.Item eventKey={gen?.id} href={`/board/${state?.boardId}/1/${gen?.id}`}
                            >
                            <Link style={navMenu} key={gen?.id} to={`/board/${state?.boardId}/1/${gen?.id}`}
                                state={{ post: state?.post, page:1, boardId: state?.boardId, genId: gen?.id }}>{gen?.genre}</Link>
                        </Dropdown.Item>
                    </>)}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )



}
