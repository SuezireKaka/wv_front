import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";
import ReplyList from "./ReplyList";
import AppContext from "context/AppContextProvider";
import { Accordion } from "react-bootstrap";
import NextPost from "./NextPost";
import ThumbnailList from "atom/ThumbnailList";
import OriginalViewList from "atom/OriginalViewList";
import ListGroupItem from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PostList from "./PostList";
import PostListCanvas from "./PostListCanvas";
import axios from "api/axios";
import { useRef } from "react";
export default function PostDetails({ postList, txtSearch = f => f }) {
  const thumbnailRequestTarget = ["video", "image"];

  const { auth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;

  console.log(state)
  //state={{ id:post.id, boardId:state.boardId, page: currentPage, search: txtSearch.current?.value, postListWithPaging}}>

  const postUri = `/work/anonymous/findById/${state.id}`;
  const postListUri = `/work/anonymous/findById/${state.parentId}`;

  /* useEffect(() => {
     onLike()
   }, [like]);
 */

  console.log("밖에서 잘 그리고 있니?")
  return <>
    <Fetch uri={postUri} renderSuccess={(post) => <RenderSuccess post={post} />} />
  </>

  function RenderSuccess({ post }) {
    console.log("뭘 받았니?", post)
    //setLike(post.likeCount)
    const [nowlike, setLike] = useState(post?.likeCount);

    const onLike = async (id, like) => {
      let newLike = like++;
      console.log("예상치 : ", newLike)
      console.log(id)
      try {
        await axios.get(
          `/work/anonymous/onLike?id=${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((res) => {
            console.log("잘 다녀왔는지 보자", res)
          })

      } catch (err) {
        console.log(err);
      }
      setLike(like++)
    }

    console.log("안에서 잘 그리고 있니?")
    return <>
      <ListGroup as="ul">
        <ListGroup.Item variant="light" as="li">
          {post.content}</ListGroup.Item>
        <ListGroup.Item as="li" disabled><OriginalViewList imgDtoList={post?.listAttachFile} x="70%" y="70%" /></ListGroup.Item>
        <ListGroup.Item>
          🧑🏻{post.writer ? post.writer.nick : ""}
          ✔<span>{post.readCount}</span>
          <span onClick={() => { onLike(post.id, nowlike) }}>👍{nowlike}</span>
          😡<span>{post.dislikeCount}</span>
          🕐<span>{displayDate(post.regDt, post.uptDt)} </span><br /></ListGroup.Item>
        <ListGroup.Item>title : <span>{post.title}</span><br />{/*{`/post/${post.id}`} */}</ListGroup.Item>
        {console.log(postList)}
        {/* <Link to={`/post/${postList[1]}`} >11</Link>*/}
      </ListGroup>
      {/* <PostListCanvas state={{ seriesId: state.seriesId, post, state, parentId: state.parentId, boardId: state.boardId }} />*/}
      {console.log(state)}
      {state?.boardId === "0001"
        ? <Link key={state.parentId} to={`/board/0001`} state={{ seriesId: state.parentId, page: state.page, boardId: state.boardId }}>목록</Link>
        : <Link key={state.parentId} to={`/series/${state?.parentId}`} state={{ seriesId: state.parentId, page: state.page, boardId: state.boardId }}>목록</Link>}


      &nbsp;&nbsp;
      {(post.writer ? post.writer.nick === auth.nick : false) ?
        <Link
          to={`/series/${post.id}/mng`}
          state={{ seriesId: state.seriesId, post, state, parentId: state.parentId }}
        >수정</Link> : ""
      }
      <br />

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>댓글확인</Accordion.Header>
          <Accordion.Body>
            <ReplyList parent={post} state={{ seriesId: state.seriesId, post, state, parentId: state.parentId, boardId: state.boardId }} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  }



}
