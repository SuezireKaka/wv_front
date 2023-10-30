import React from 'react'
import { Dropdown } from 'react-bootstrap'
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import UserProfile from './UserProfile';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Fetch } from 'toolbox/Fetch';
import { Link } from 'react-router-dom';

export default function LoginButton() {
    const { auth, setAuth } = useContext(AppContext);
    const roles = auth.roles ? auth.roles : [""];
    const [signInResult, setSignInResult] = useState({});
    const navigate = useNavigate();
    const findByNickUri = `/party/anonymous/findByNick/${auth.nick}`;

    const navMenu = {
      color:"grey",
      textDecoration:"none"
    }

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({nick : "", roles : []});
    window.sessionStorage.setItem("nowUser", JSON.stringify({nick : "", roles : []}));
    setSignInResult({});
    navigate("/")
  }
  function renderSuccess(profile) {
    console.log("=======boardList=========");
    console.log(profile);
    return <>
       <Dropdown.Item href="/userProfile"><Link style={navMenu} key={profile.id} to="/userProfile" state={profile}>프로필수정</Link></Dropdown.Item>
    </>
  }


  return (
    <div>    
    <Dropdown style={{position: "absolute",right: "10%"}}>
    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" size="sm">
      {!roles || roles.length === 0? <>Sign</>: <>{auth.nick}님</>}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {!roles || roles.length === 0?
      <>
      <Dropdown.Item href="/log-in">로그인</Dropdown.Item>
      <Dropdown.Item href="/agreement">회원가입</Dropdown.Item>
      </>
      : 
      <>
      <Dropdown.Item href="/">홈</Dropdown.Item>
      <Dropdown.Item href="/test1">테스트</Dropdown.Item>
      <Dropdown.Item href="/favoriteslist">즐겨찾기</Dropdown.Item>
      <Fetch uri={findByNickUri} renderSuccess={renderSuccess} />
      <Dropdown.Item href="/UserSeries">내작품보기</Dropdown.Item>
      
      <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
      </>
      }
    </Dropdown.Menu>
  </Dropdown></div>
  )
}
