import { useState } from "react";
import { Link } from "react-router-dom";
import CheckBox from "toolbox/CheckBox";

export default function Agreement() {
    console.log([false] * 3)

    function onAgreeAll() {

    }

    return <div>
    <h1>Wondervatory 가입 페이지</h1>
    <br></br>
    <h2>가입하시려면 아래 사항들에 동의해주세요!</h2>
    <br></br>
    <br></br>
    <CheckBox onChange={onAgreeAll}>모두 동의하기</CheckBox>
    <br></br>
    <br></br>
    <h3>(대충 근사한 약관 페이지)</h3>
    <br></br>
    <br></br>
    <Link to={"/"}><button>이전으로</button></Link>
    <Link to={"/signup/"}><button>다음으로</button></Link>
    </div>
}