import React from 'react'
import axios from 'api/axios';
import { Fetch } from 'toolbox/Fetch';
import { Form } from 'react-bootstrap';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { useState } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';

export default function PostGenreList({ genreTypes, genreList, checkHandler=f=>f, checkedItemHandler=f=>f}) {
    const { genreCodeList } = useContext(AppContext); //15개짜리
    //const [genId, setGenId] = useState([])

    const onCheck = ({ target }) => {
        checkedItemHandler(target.parentNode, target.value, target.checked)
    }

    
    return <Form>
        {genreCodeList?.map((gen, i) =>
            <Form.Check
                inline
                label={gen.genre}
                name="checkGenre"
                type="checkbox"
                value={gen.id}
                onChange={e => onCheck(e)}
                id={gen.id}
                defaultChecked={genreList?.map((genre) => genre?.id).includes(gen?.id)}
            />)}
    </Form>
}

{/*
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>작품에 해당하는 장르를 선택해주세요</Form.Label>
            <CheckboxGroup values={genreTypes} onChange={setGenreTypes}>
                {genreCodeList?.map((gen) =>
                <>{console.log(gen)}
                    <Checkbox key={gen.id} name="genre" value={gen.id} checked={genreList.map((genre)=>genre.id).includes(gen.id)} >
                        {gen.genre}{console.log(genreList.includes(gen))}
                    </Checkbox>
                </>
                )}{}
            </CheckboxGroup>
        </Form.Group>*/}