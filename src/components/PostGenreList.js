import React from 'react'
import axios from 'api/axios';
import { Fetch } from 'toolbox/Fetch';
import { Form } from 'react-bootstrap';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { useState } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';

export default function PostGenreList({ genreList, genreTypes, setGenreTypes = f => f }) {
    const { genreCodeList } = useContext(AppContext);
    const [genId, setGenId] = useState([])
    console.log(genreList);
    const [colors, setColors] = React.useState(["green"]);
    return <>
    
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>작품에 해당하는 장르를 선택해주세요</Form.Label>
            <CheckboxGroup values={genreTypes} onChange={setGenreTypes}>
                {genreCodeList?.map((gen) =>
                    <Checkbox key={gen.id} name="genre" value={gen.id} defaultChecked={true} >
                        {gen.genre}
                    </Checkbox>
                )}
            </CheckboxGroup>
        </Form.Group>

    </>
}
/*
 {console.log(gen)}{console.log(genreList.includes(gen))}
 */