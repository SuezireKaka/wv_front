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
import LoginTypeIcon from "toolbox/LoginTypeIcon";
import { displayPagination } from "toolbox/Pagination";

export default function PostList() {
  const { auth } = useContext(AppContext);

  const location = useLocation();
  const state = location.state;

  function buildUrl(step) {
    if (state.search)
      return `/work/anonymous/search/${state.boardId}/${state.search}/${state.page}`;
    else
      return `/work/anonymous/listAllPost/${state.seriesId}/${state.page}`;//${state.boardId}
  }
  const [postListUri, setPostListUri] = useState(buildUrl(222));

  const [targetBoard, setTargetBoard] = useState(state.boardId);


  if (targetBoard !== state.boardId) {
    setTargetBoard(state.boardId);
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

  function renderSuccess(postListWithPaging) {

    const postList = postListWithPaging?.firstVal;
    const pagenation = postListWithPaging?.secondVal;

    console.log("뭐가 나온 건지 확인", postListWithPaging)

  return <>
      <Table  striped bordered hover responsive variant="white">
          <thead>

        </thead>
        <tbody>
          {postList?.map(post => (
            <tr key={post.id}>
              <td><ThumbnailList imgDtoList={post?.listAttachFile} /></td>
              <td width="60%">
                <Link style={{ all: "unset", cursor: "pointer" }} key={post.id} to={`/post/${post.id}`} postListWithPaging={postListWithPaging} txtSearch={txtSearch}
                  state={{ id: post.id, page: state.page, search: txtSearch.current?.value, postListWithPaging, parentId: state?.seriesId, boardId: post?.boardVO?.id, likeCount:post?.likeCount, dislikeCount:post?.dislikeCount }}>{/*시리즈아이디필요*/}
                  {post.title}</Link>
              </td>
              <td><LoginTypeIcon loginType={post?.writer?.accountType} />{!post.writer?.nick ? post.writer?.kakaoNick : post.writer?.nick}</td>
              <td>✔{post.readCount}</td>
              <td>🤣{post.likeCount}</td>
              <td>🕐{displayDate(post.regDt, post.uptDt)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        </tfoot>
      </Table>
      <div style={{ Align: "center", display: "inline-block" }}>
        <Pagination>
          {pagenation?.lastPage >= 2 ? displayPagination(pagenation, state, setPostListUri, buildUrl) : ""}
        </Pagination>
      </div>
    </>
  }

  console.log("여기서의 상태는?", state)

  return (
    <div>

      <Fetch uri={postListUri} renderSuccess={renderSuccess} />

    </div>
  )
}
