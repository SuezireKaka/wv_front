import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";

export default function BBSNav() {
  const boardListUri = `http://localhost:8080/bb/anonymous/listAllPost/0001/1`;
  return (
    <><Link to="/">Home</Link>
    &nbsp;&nbsp;|
    <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
    </>
  );
  
  function renderSuccess(boardList) {
    console.log(boardList);
    console.log("놀자");
    return <>
        
    </>
}
}


