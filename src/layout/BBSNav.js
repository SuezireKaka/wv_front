import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";

export default function BBSNav() {
  const boardListUri = `/bb/anonymous/listAll`;
  return (
    <><Link to="/">Home</Link>
    &nbsp;&nbsp;|
    <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
    </>
  );
  
  function renderSuccess(boardList) {
    return <>
        {boardList.map(board => (
            <Link key={board.id} to={`/board`}
                state={{ boardId: board.id, page: 1 }}>
                &nbsp;&nbsp;{board.name}
            </Link>
        ))}

        {boardList.map(board => (
            <Link key={board.id} to={`/post-list`}
                state={{ boardId: board.id, page: 1 }}>
                &nbsp;&nbsp;Scrolling_{board.name}
            </Link>
        ))}
    </>
}
}


