import React from 'react'
import { Dropdown } from 'react-bootstrap'
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import UserProfile from './UserProfile';
import { useState } from 'react';

export default function LoginButton() {
    const { auth, setAuth } = useContext(AppContext);
    const roles = auth.roles ? auth.roles : [""];
    const [signInResult, setSignInResult] = useState({});

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({nick : "", roles : []});
    window.sessionStorage.setItem("nowUser", JSON.stringify({nick : "", roles : []}));
    setSignInResult({});

  }
  return (
    <div>    <Dropdown style={{float: "right", marginRight: "10px"}}>
    <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
      {!roles || roles.length === 0? <>로그인</>: <>{auth.nick}님</>}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {!roles || roles.length === 0?
      <>
      <Dropdown.Item href="/log-in">로그인</Dropdown.Item>
      <Dropdown.Item href="/Agreement">회원가입</Dropdown.Item>
      </>
      
      : 
      <>
      <Dropdown.Item href="#/1">새글작성??</Dropdown.Item>
      <Dropdown.Item href="#/2">내작품보기??</Dropdown.Item>
      <Dropdown.Item href="/userProfile">프로필수정</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
      </>
      }
   
    </Dropdown.Menu>
  </Dropdown></div>
  )
}
