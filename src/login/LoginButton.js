import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import AppContext from 'context/AppContextProvider';
import { useNavigate } from 'react-router';
import { AxiosAuth } from 'toolbox/Fetch';
import { Link } from 'react-router-dom';
import LoginTypeIcon from 'login/LoginTypeIcon';

export default function LoginButton() {
  const { auth, setAuth } = useContext(AppContext);
  const roles = auth.roles ? auth.roles : [""];
  const [signInResult, setSignInResult] = useState({});
  const navigate = useNavigate();
  const findByNickUri = `/party/findById/${auth.userId}`;

  const navMenu = {
    color: "black",
    textDecoration: "none"
  }

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({ nick: "", roles: [] });
    window.sessionStorage.setItem("nowUser", JSON.stringify({ nick: "", roles: [] }));
    setSignInResult({});
    navigate("/")
  }

  return (
    <div>
      <Dropdown style={{ position: "absolute", right: "10%", zIndex: "2" }}>
        <Dropdown.Toggle id="dropdown-basic" size="sm"
          style={{backgroundColor : "#aa7755", borderColor : "#aa7755", color : "#ffffff"}}
        >
          {!roles || roles.length === 0 ? <>Sign</> : <><LoginTypeIcon loginType={auth.accountType} /> {auth.nick}님</>}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{backgroundColor : "#ead4bb"}}>
          {!roles || roles.length === 0 ?
            <>
              <Dropdown.Item href="/log-in">로그인</Dropdown.Item>
              <Dropdown.Item href="/agreement">회원가입</Dropdown.Item>
            </>
            :
            <>
              <Dropdown.Item href="/">홈</Dropdown.Item>
              <Dropdown.Item href="/FavoritesPrev">즐겨찾기</Dropdown.Item>
              {auth.accountType === "원더" ? <AxiosAuth uri={findByNickUri} renderSuccess={(res) => {
                return <Dropdown.Item href="/userProfile"><Link style={navMenu} key={res.data.id} to="/userProfile" state={res.data}>프로필</Link></Dropdown.Item>
              }} /> : ""}
              <Dropdown.Item href="/UserSeriesPrev">내작품보기</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
            </>
          }
        </Dropdown.Menu>
      </Dropdown></div>
  )
}
