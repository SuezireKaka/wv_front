import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { useContext } from "react";
import AppContext from "context/AppContextProvider";
import UserProfile from "login/UserProfile";
import { Dropdown } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import LoginButton from "login/LoginButton";

export default function BBSNav() {

  const boardListUri = `http://localhost:8080/bb/anonymous/listAll`;
  return <><LoginButton />
    <Link to="/">Home</Link>
    &nbsp;
    <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
    <Link to="/memberList/0000">회원정보</Link>
    <Link to="/test1">테스트1</Link>

    {/*isManager ? <Link key="dfhdefh" to={`/member-list/0000`}>
                회원목록
</Link> : ""*/}
    

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


