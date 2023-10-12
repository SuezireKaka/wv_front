import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { useContext } from "react";
import AppContext from "context/AppContextProvider";
import UserProfile from "login/UserProfile";
import { Dropdown } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function BBSNav() {
  const { auth } = useContext(AppContext);
  const roles = auth.roles ? auth.roles : [""];


  const boardListUri = `http://localhost:8080/bb/anonymous/listAll`;
  return <>
    <Link to="/">Home</Link>
    &nbsp;&nbsp;|
    <Fetch uri={boardListUri} renderSuccess={renderSuccess} />

    <Dropdown style={{float: "right", marginRight: "10px"}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
        {!roles || roles[0] === ""? <>로그인</>: <UserProfile user={auth}/>}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/log-in">로그인</Dropdown.Item>
        <Dropdown.Item href="#/action-2">회원가입</Dropdown.Item>
        <Dropdown.Item href="#/action-3">프로필수정</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


        

 



  </>;
  
  function renderSuccess(boardList) {
    return <>
          {boardList.map(board => (
                <Link key={board.id} to={`/board/${board.id}`}
                    state={{ boardId: board.id, page: 1 }}>
                    &nbsp;&nbsp;{board.name}
                </Link>
            ))}
    </>
}
}


