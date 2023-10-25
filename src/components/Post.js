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
import ThumbnailList from "atom/ThumbnailList";
import { Pagination } from "react-bootstrap";

export default function Post() {
  const { auth } = useContext(AppContext);

  const location = useLocation();
  const state = location.state;


  function buildUrl(step) {
  
    if (state.search)
        return `/work/anonymous/search/${state.boardId}/${state.search}/${state.page}`;
    else
        return `/work/anonymous/listAllPost/${state.boardId}/${state.page}`;//${state.boardId}
}
  const [postListUri, setPostListUri] = useState(buildUrl(222));
    
  const [targetBoard, setTargetBoard] = useState(state.boardId);



  if (targetBoard !== state.boardId) {

    setTargetBoard(state.boardId);
    setPostListUri(buildUrl());

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
        pagingBar.push(<Pagination.Item key={paging.startPage - 1} onClick={(e) => goTo(paging.startPage - 1)}>&lt;</Pagination.Item>);
    for (let i = paging.startPage; i <= paging.lastPage; i++) {
        pagingBar.push(<Pagination.Item key={i} onClick={(e) => goTo(i)}>{i}</Pagination.Item>);
    }
    if (paging.next)
        pagingBar.push(<Pagination.Item key={paging.lastPage + 1} onClick={(e) => goTo(paging.lastPage + 1)}>&gt;</Pagination.Item>);
    return pagingBar;
}

function renderSuccess(postListWithPaging) {

  const postList = postListWithPaging?.firstVal;
  const pagenation = postListWithPaging?.secondVal;

  return <>
      <Table responsive variant="white">
          <thead>

          </thead>
          <tbody>
              {postList?.map(post => (
                <tr key={post.id}>
                    {console.log(post)}
                      <td><ThumbnailList imgDtoList={post?.listAttachFile}/></td>
                      <td width="60%">
                    <Link style={{all:"unset"}} key={post.id} to={`/post/${post.id}`} postListWithPaging={postListWithPaging} txtSearch={txtSearch}
                          state={{ id:post.id, page: state.page, search: txtSearch.current?.value, postListWithPaging,seriesId:state?.seriesId, parentId:state?.seriesId, boardId:post?.boardVO?.id, likeCount:post.likeCount}}>{/*시리즈아이디필요*/}
                             {post.title}</Link>
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
      <div  style={{Align:"center"}}>
      <Pagination>
      {pagenation?.lastPage>=2?displayPagination(pagenation):""}
      </Pagination>
      </div>
  </>
}
    return (
      <div>
      <Link to={`/series/${state.boardId}/mng`} state={{seriesId:state.boardId, parentId : state.boardId, boardId:state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile:[] }}}>
      <button>신규</button>
      </Link>
        <Fetch uri={postListUri} renderSuccess={renderSuccess} />
  
      </div>
    )
}