import { useLocation } from "react-router";
import { useState } from "react";
import axios from 'api/axios';
import { useEffect } from "react";
import { Fetch } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";
import PostList from "./PostList";


export default function Series() {
  const location = useLocation();
  let state = location.state;
  console.log(state);
  const [targetBoard, setTargetBoard] = useState(state.boardId);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const postListUri = `http://localhost:8080/work/anonymous/listAllPost/${state.boardId}/1`;

  function RenderSuccess(series){
    return <>
    시리즈
    {console.log(series)}
    [썸네일 넣을칸]<br/><br/><br/>
    제목:{series.title}<br/>
    설명:{series.content}<br/>
    작가:{series.writer?.nick}<br/><br/>
    게시글등록링크 만들어야함
    {/*console.log(series)
    <PostList series={series} />*/}
    
    </>
  }
    return (
      <div>
        <Fetch uri={postListUri} renderSuccess={RenderSuccess} />
<<<<<<< HEAD


        {postList?.map((post, index) => {
          if (index === postList.length - 1) {
            return (
                <p key={post.id} ref={setLastIntersectingImage}>
                    <h2>{post.title}</h2>
                    <h4>{post.writer ? post.writer.name : ""}</h4>
                    <span>{post.readCnt}</span>
                    <span>{post.likeCnt}</span>
                    <h6>최종작성일 : <span>{displayDate(post.regDt, post.uptDt)} </span></h6>
                </p>
            );
          } else {
            return (
                <p key={post.id}>
                    <h2>{post.title}</h2>
                    <h4>{post.writer ? post.writer.name : ""}</h4>
                    <span>{post.readCnt}</span>
                    <span>{post.likeCnt}</span>
                    <h6>최종작성일 : <span>{displayDate(post.regDt, post.uptDt)} </span></h6>
                </p>
            );
          }
        })}
  
      </div>)
 
=======
      </div>
      )
>>>>>>> 4d39e775bd4c1729bfb54fc88b3703c2ff1541fd
  }
  