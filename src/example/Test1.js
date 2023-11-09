import React from 'react'
import axios from 'api/axios';
import { Fetch } from 'toolbox/Fetch';
import { Form } from 'react-bootstrap';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { useState } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';
export default function Test1() {

 
        const [colors, setColors] = React.useState([]);
  return (
    <article>
      <header>
        <h3>체크박스 그룹</h3>
      </header>
      <CheckboxGroup
        label="좋아하는 색깔은?"
        values={colors}
        onChange={setColors}
      >
        <Checkbox value="red" defaultChecked>빨강</Checkbox>
        <Checkbox value="yellow">노랑</Checkbox>
        <Checkbox value="green">초록</Checkbox>
        <Checkbox value="blue">파랑</Checkbox>
        <Checkbox value="violet" disabled>
          보라
        </Checkbox>
      </CheckboxGroup>
      <footer>[{colors.join(",")}]을 좋아하시군요!</footer>
    </article>
  );



}
