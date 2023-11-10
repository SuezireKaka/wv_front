import React from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Fetch } from 'toolbox/Fetch'
import AppContext from 'context/AppContextProvider'
import { useContext } from 'react'



export default function GenreButton({ txtSearch, onSearch = f => f }) {
    const { genreCodeList } = useContext(AppContext);

    function onGenreSearch(e) {
        
        //return console.log(e);
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                    장르
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="0">전체</Dropdown.Item>
                    <Dropdown.Divider />
                    {genreCodeList?.map((gen) => <>
                        <Dropdown.Item eventKey={gen.id} onSelect={onGenreSearch(gen.genre)}>{gen.genre}</Dropdown.Item>
                    </>)}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

}
