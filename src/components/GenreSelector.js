import React from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Fetch } from 'toolbox/Fetch'
import AppContext from 'context/AppContextProvider'
import { useContext } from 'react'
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function GenreSelector({ initGenre, onChange = f => f }) {
    const { genreCodeList } = useContext(AppContext);
          return <>
       
            <button onClick={(_,index) => onChange(_,null)}>전체</button>
            {genreCodeList?.map((gen,index) => <>
                <button onClick={() => onChange(gen.id,index)}>{gen?.genre}</button>
            </>)}
            </>
    
}
