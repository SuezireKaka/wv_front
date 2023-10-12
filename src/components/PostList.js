import { useLocation } from "react-router";
import { useState } from "react";
import axios from "api/axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { displayDate } from "toolbox/DateDisplayer";
import { Fetch } from "toolbox/Fetch";

export default function PostList() {
  //const { auth } = useContext(AppContext);
  //const isMember = auth?.roles?.includes("member");
  const location = useLocation();
  let state = location.state;
console.log(state?.seriesId)

  console.log("PostList param", state);
  function buildUrl(step) {
    console.log("buildUrl(step", step);
  
    if (state.search)
        return `http://localhost:8080/work/anonymous/search/${state.boardId}/${state.search}/${state.page}`;
    else
        return `http://localhost:8080/work/anonymous/listAllPost/${state.seriesId}/1`;//${state.boardId}
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
        pagingBar.push(<button key={paging.startPage - 1} onClick={(e) => goTo(paging.startPage - 1)}>&lt;</button>);
    for (let i = paging.startPage; i <= paging.lastPage; i++) {
        pagingBar.push(<button key={i} onClick={(e) => goTo(i)}>{i}</button>);
    }
    if (paging.next)
        pagingBar.push(<button key={paging.lastPage + 1} onClick={(e) => goTo(paging.lastPage + 1)}>&gt;</button>);
    return pagingBar;
}

function renderSuccess(postListWithPaging) {

  console.log(postListWithPaging);
  const postList = postListWithPaging?.firstVal;
  const pagenation = postListWithPaging?.secondVal;
  console.log(postList);
  return <>
      <table>
          <thead>
              <tr>
                  <th>포스트리스트</th>
                  <th> </th>
                  <th> </th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              {postList?.map(post => (
                  <tr key={post.id}>
                      <td>
                        {console.log(post)}
                          <Link key={post.id} to={`/postd`}
                                state={{ id:post.id, page: state.page, search: txtSearch.current?.value, postListWithPaging}}>{/*시리즈아이디필요*/}
                              &nbsp;&nbsp;{post.title}
                          </Link>
                      </td>
                      <td>{post.writer ? post.writer.name : ""}</td>
                      <td>{post.readCnt}</td>
                      <td>{post.likeCnt}</td>
                      <td>최종작성일 : <span>{displayDate(post.regDt, post.uptDt)} </span></td>
                  </tr>
              ))}
          </tbody>
      </table>
      {pagenation?displayPagination(pagenation):""}
  </>
}
    return (
      <div>
        
        {postListUri}
        {console.log(postListUri)}
        <Fetch uri={postListUri} renderSuccess={renderSuccess} />
  
      </div>
    )
  }
  