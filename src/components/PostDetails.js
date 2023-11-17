import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";
import ReplyList from "./ReplyList";
import AppContext from "context/AppContextProvider";
import { Accordion } from "react-bootstrap";
import ThumbnailList from "atom/ThumbnailList";
import OriginalViewList from "atom/OriginalViewList";
import ListGroupItem from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import PostList from "./PostList";

import axios from "api/axios";
import { useRef } from "react";
import { useNavigate } from "react-router";
import PostPrevNext from "./PostPrevNext";
import React from "react";
import LoginTypeIcon from "toolbox/LoginTypeIcon";
import PostCnt from "./PostCnt";


export default function PostDetails() {
  const thumbnailRequestTarget = ["video", "image"];
  const navigate = useNavigate();
  const { auth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  const postlist = location.state?.postListWithPaging?.firstVal;
  //state={{ id:post.id, boardId:state.boardId, page: currentPage, search: txtSearch.current?.value, postListWithPaging}}>
  const postUri = `/work/anonymous/findById/${state.id}`;
  const postListUri = `/work/anonymous/findById/${state.parentId}`;

  console.log("밖에서 잘 그리고 있니?")
  return <>
    <Fetch uri={postUri} renderSuccess={(post) => <RenderSuccess post={post} />} />
  </>

  function RenderSuccess({ post }) {
    const [counter, setCounter] = React.useState(post?.likeCount);
    
    console.log("뭘 받았니?", post)
    //setLike(post.likeCount)
    const [nowLike, setLike] = React.useState(post?.likeCount);
    const [nowDislike, setDisLike] = useState(post?.dislikeCount);
    
    const onClickLike = async (id, like)=>{
      let newLike = like+1;
      console.log("예상치 : ", newLike)
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
   
      setLike(newLike+1)

    }



    const onLike = async (id, like) => {
      let newLike = like++;
      console.log("예상치 : ", newLike)
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
      //navigate(0);
      setLike(like++)
    }

    
    const onDisLike = async (id, dislike) => {
      let newDisLike = dislike++;
      console.log("예상치 : ", newDisLike)
      try {
        await axios.get(
          `/work/anonymous/onDisLike?id=${id}`,
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
        navigate(0);
      setLike(dislike++)
    }
    
    const handleDelete = async (e) => {
      e.preventDefault();

      try {
        const data = await axios.delete(`/work/${post.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              "x-auth-token": `Bearer ${auth.accessToken}`
            }
          });
      } catch (err) {
        console.log('Delete Failed', err);
      } finally {
        console.log('Delete state', state);
        navigate(-1, { state: state });
      }
    }



    console.log("안에서 잘 그리고 있니?")
    return <>
      <ListGroup as="ul">
        <ListGroup.Item variant="light" as="li" style={{whiteSpace:"pre-line", textAlign : "left", width:"50%", margin: "auto"}}>
          <div>{post.content}</div></ListGroup.Item>
          <ListGroup.Item as="li" disabled>
          {(state?.boardId === "0000"||state?.boardId === "0001") ? <ThumbnailList imgDtoList={post?.listAttachFile}/>:
        <OriginalViewList imgDtoList={post?.listAttachFile} x="51%" y="51%" />}
        </ListGroup.Item>
        <ListGroup.Item>
          <LoginTypeIcon loginType={post?.writer?.accountType}/>{!post.writer?.nick ?post.writer?.kakaoNick  :post.writer?.nick}
          ✔<span>{post.readCount}</span>
          {/* <PostCnt onClickLike={onClickLike} post={post} setLike={setLike}/>*/}
          <span onClick={() => { onLike(post.id, post.likeCount) }}>👍{post.likeCount}//{nowLike}</span>
          <span onClick={() => { onDisLike(post.id, post.dislikeCount) }}>😡{post.dislikeCount}</span>
          🕐<span>{displayDate(post.regDt, post.uptDt)} </span><br /></ListGroup.Item>
        <ListGroup.Item> <PostPrevNext post={post} state={{ parentId: state.parentId, boardId: state.boardId, page: state.page, postListWithPaging: state.postListWithPaging }} /></ListGroup.Item>

        {/* <Link to={`/post/${postList[1]}`} >11</Link>*/}
      </ListGroup>
      {/* <PostListCanvas state={{ seriesId: state.seriesId, post, state, parentId: state.parentId, boardId: state.boardId }} />*/}

      {state?.boardId === "0000" ?
      <Link key={state.parentId} to={`/`} state={{ seriesId: state.parentId, page: state.page, boardId: state.boardId }}><Button variant="outline-warning">목록</Button></Link>
      : (state?.boardId === "0001" )
        ? <Link key={state.parentId} to={`/board/${state.boardId}`} state={{ seriesId: state.parentId, page: state.page, boardId: state.boardId }}><Button variant="outline-warning">목록</Button></Link>
        : <Link key={state.parentId} to={`/series/${state?.parentId}`} state={{ seriesId: state.parentId, page: state.page, boardId: state.boardId }}><Button variant="outline-warning">목록</Button></Link>}
      &nbsp;
      {/* 
      <PostListOffcanvas post={post} state={{ seriesId: state.parentId, page: state.page, boardId: state.boardId }}/>
      &nbsp;*/}
      {(post.writer ? post.writer.id === auth.userId : false) ? <>
        <Link
          to={`/series/${post.id}/mng`}
          state={{ seriesId: state.seriesId, post, state, parentId: state.parentId }}
        ><Button variant="outline-info">수정</Button></Link>&nbsp;<Button variant="outline-dark" onClick={handleDelete}>삭제</Button></> : ""}
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

// 아코디언 색 먹이기 <div style={{ display: 'block????', backgroundColor:"blue", padding: 1 }}> 
// <Accordion.Body style={{ backgroundColor:"lightblue"}}>