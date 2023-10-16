import { useLocation } from "react-router";
import { useState } from "react";
import axios from "api/axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { displayDate } from "toolbox/DateDisplayer";
import { Fetch } from "toolbox/Fetch";
import AppContext from "context/AppContextProvider";
import { Table } from "react-bootstrap";

export default function PostList() {
  const { auth } = useContext(AppContext);
  const isMember = auth?.roles?.includes("member");
  const location = useLocation();
  const state = location.state;

console.log(state?.seriesId)
console.log(state)
console.log(state?.page)
  console.log("PostList param", state);
  function buildUrl(step) {
    console.log("buildUrl(step", step);
  
    if (state.search)
        return `/work/anonymous/search/${state.boardId}/${state.search}/${state.page}`;
    else
        return `/work/anonymous/listAllPost/${state.seriesId}/${state.page}`;//${state.boardId}
}
  const [postListUri, setPostListUri] = useState(buildUrl(222));
    
  const [targetBoard, setTargetBoard] = useState(state.boardId);
  console.log("saved targetBoard", targetBoard);


  if (targetBoard !== state.boardId) {
    console.log("targetBoard changing", state.boardId);
    setTargetBoard(state.boardId);
    setPostListUri(buildUrl());
    console.log(postListUri);
    console.log("다시 그리기 시작해");
}

function goTo(chosenPage) {
    state.postListWithPaging = null;
    state.page = chosenPage;

    setPostListUri(buildUrl());
}

const txtSearch = useRef();

const onSearch = (e) => {
    e.preventDefault();
    let search = txtSearch.current.value;

    state.postListWithPaging = null;
    state.search = search;
    state.page = 1;

    setPostListUri(buildUrl());
}

const displayPagination = (paging) => {
    const pagingBar = [];
    if (paging.prev)
        pagingBar.push(<button style={{all:"unset"}} key={paging.startPage - 1} onClick={(e) => goTo(paging.startPage - 1)}>&lt;</button>);
    for (let i = paging.startPage; i <= paging.lastPage; i++) {
        pagingBar.push(<button style={{all:"unset"}} key={i} onClick={(e) => goTo(i)}>[{i}]</button>);
    }
    if (paging.next)
        pagingBar.push(<button style={{all:"unset"}} key={paging.lastPage + 1} onClick={(e) => goTo(paging.lastPage + 1)}>&gt;</button>);
    return pagingBar;
}

function renderSuccess(postListWithPaging) {

  console.log(postListWithPaging);
  const postList = postListWithPaging?.firstVal;
  const pagenation = postListWithPaging?.secondVal;
  console.log(postList);
  console.log(pagenation);
  return <>
      <Table responsive variant="white">
          <thead>

          </thead>
          <tbody>
              {postList?.map(post => (
                  <tr key={post.id}>
                      <td width="60%">
                        {console.log(post)}
                          <Link key={post.id} to={`/post/${post.id}`} postListWithPaging={postListWithPaging} txtSearch={txtSearch}
                                state={{ id:post.id, page: state.page, search: txtSearch.current?.value, postListWithPaging, parentId:state?.seriesId}}>{/*시리즈아이디필요*/}
                              &nbsp;&nbsp;{post.title}
                          </Link>
                      </td>
                      <td>👦🏻{post.writer ? post.writer.nick : ""}</td>
                      <td>✔{post.readCount}</td>
                      <td>🤣{post.likeCount}</td>
                      <td>🕐{displayDate(post.regDt, post.uptDt)}</td>
                  </tr>
              ))}
          </tbody>
          <tfoot>
          </tfoot>
      </Table>
      {pagenation?.lastPage>=2?displayPagination(pagenation):""}
  </>
}
    return (
      <div>
       
        <Fetch uri={postListUri} renderSuccess={renderSuccess} />
  
      </div>
    )
}
  