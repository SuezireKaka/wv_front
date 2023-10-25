import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "toolbox/Checkbox";
import CheckboxGroup from "toolbox/CheckboxGroup";
import { Button } from 'react-bootstrap';

export default function Agreement() {
    const [service, setService] = React.useState(false);
    const [marketing, setMarketing] = React.useState(false);
    return (
      <article>
        <header>
          <h3>Wondervatory 가입 페이지</h3>
        </header>
        <body>
        입하시려면 아래 사항들에 동의해주세요!<br/>
        <Checkbox checked={service} onChange={setService}>
          (필수) 서비스 이용약관 동의
        </Checkbox>
        </body>
        <footer>
        <Link to={"/"}><Button variant="danger">이전으로</Button></Link>
        <Link to={"/register/"}><Button disabled={!service} variant="success">회원 가입</Button></Link>
        </footer>
      </article>
    );
}


/*
<article>
      <header>
        <h3>체크박스 그룹</h3>
      </header>
      <CheckboxGroup
        label="좋아하는 색깔은?"
        values={colors}
        onChange={setColors}
      >
        <Checkbox value="red">빨강</Checkbox>
        <Checkbox value="yellow">노랑</Checkbox>
        <Checkbox value="green">초록</Checkbox>
        <Checkbox value="blue">파랑</Checkbox>
        <Checkbox value="violet" disabled>
          보라
        </Checkbox>
      </CheckboxGroup>
      <footer>[{colors.join(",")}]을 좋아하시군요!</footer>
    </article>
 */