import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { useContext } from "react";
import AppContext from "context/AppContextProvider";
import UserProfile from "login/UserProfile";


export default function BBSNav() {
  const { auth } = useContext(AppContext);
  const roles = auth.roles ? auth.roles : [""];


  const boardListUri = `http://localhost:8080/bb/anonymous/listAll`;
  return <>
    <Link to="/">Home</Link>
    &nbsp;&nbsp;|
    <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
    {!roles || roles[0] === ""
    ? <Link to="/"><button style={{float: "right", marginRight: "10px"}}>로그인</button></Link>
    : <UserProfile user={auth}/>
    }
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


