import React from 'react'
import { Dropdown } from 'react-bootstrap'
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import UserProfile from './UserProfile';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosAuth, Fetch } from 'toolbox/Fetch';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { FaWpexplorer, FaComment } from 'react-icons/fa';
import LoginTypeIcon from 'toolbox/LoginTypeIcon';

export default function LoginButton() {
    const { auth, setAuth } = useContext(AppContext);
    const roles = auth.roles ? auth.roles : [""];
    const loginType = auth.loginType ? auth.loginType : "";
    const [signInResult, setSignInResult] = useState({});
    const navigate = useNavigate();
    const findByNickUri = `/party/findById/${auth.userId}`;

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
  function renderSuccess(res) {

    return <>
       <Dropdown.Item href="/userProfile"><Link style={navMenu} key={res.data.id} to="/userProfile" state={res.data}>프로필</Link></Dropdown.Item>
    </>
  }

  

  return (
    <div>    
    <Dropdown style={{position: "absolute",right: "10%"}}>
    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
      {!roles || roles.length === 0? <>Sign</>: <><LoginTypeIcon loginType={auth.accountType}/> {auth.nick}님</>}
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
      <Dropdown.Item href="/favoriteslist">즐겨찾기</Dropdown.Item>
      {auth.accountType ==="원더" ?<AxiosAuth uri={findByNickUri} auth={auth} renderSuccess={renderSuccess} />:"" }
      <Dropdown.Item href="/UserSeries">내작품보기</Dropdown.Item>
      
      <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
      </>
      }
    </Dropdown.Menu>
  </Dropdown></div>
  )
}
