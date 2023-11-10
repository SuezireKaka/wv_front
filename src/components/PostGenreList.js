import React from 'react'
import axios from 'api/axios';
import { Fetch } from 'toolbox/Fetch';
import { Form } from 'react-bootstrap';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { useState } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export default function PostGenreList({ genreTypes, genreList, setGenreTypes=f=>f, checkHandler=f=>f, checkedItemHandler=f=>f}) {
    const { genreCodeList } = useContext(AppContext); //15개짜리
    //const [genId, setGenId] = useState([])

    const onCheck = ({ target }) => {
        checkedItemHandler(target?.parentNode, target?.value, target?.checked)
    }

    //setGenreTypes()
    return <Form>
        {genreCodeList?.map((gen, i) =>

            <Form.Check
                inline
                label={gen?.genre}
                name="checkGenre"
                type="checkbox"
                value={gen?.id}
                onChange={e => onCheck(e)}
                id={gen?.id}
                defaultChecked={genreList?.map((genre) => genre?.id).includes(gen?.id)}
                />

              )}
    </Form>
}
