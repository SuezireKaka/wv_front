import React from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Fetch } from 'toolbox/Fetch'
import AppContext from 'context/AppContextProvider'
import { useContext } from 'react'

export default function GenreButton() {
    const genreUrl = `/work/anonymous/listAllGenre`;
    
    function renderSuccess(genreList) {
        console.log(genreList);
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                        장르
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="0">전체</Dropdown.Item>
                        <Dropdown.Divider />
                        {genreList?.map((gen)=><>
                        {console.log(gen)}
                        <Dropdown.Item eventKey={gen.id} href="#/action-1">{gen.genre}</Dropdown.Item>
                        </>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
    return (
        <div><Fetch uri={genreUrl} renderSuccess={renderSuccess} /></div>
    )
}
