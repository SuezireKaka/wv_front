import React from 'react'
import axios from 'api/axios';
import { Fetch } from 'toolbox/Fetch';
import { Form } from 'react-bootstrap';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { useState } from 'react';

export default function PostGenreList({genreTypes, setGenreTypes=f=>f}) {

   const genreUrl = `/work/anonymous/listAllGenre`;

   function renderSuccess (genreList) {
    console.log(genreList);
    //const result = await axios( genreUrl = `/work/anonymous/listAllGenre`);
    //console.log(result);
    return <>
		<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>작품에 해당하는 장르를 선택해주세요</Form.Label>
                <CheckboxGroup values={genreTypes} onChange={setGenreTypes}>
                    {genreList?.map((gen)=><>
                        <Checkbox name="genre" value={gen.genre}>
                            {gen.genre} 
                        </Checkbox>
                    </>)}
                </CheckboxGroup>
            </Form.Group>
        </>
    }

  return (
    <div><Fetch uri={genreUrl} renderSuccess={renderSuccess} /></div>
  )
}
