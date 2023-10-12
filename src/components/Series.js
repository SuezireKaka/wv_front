import { useLocation } from "react-router";
import { useState } from "react";
import axios from 'api/axios';
import { useEffect } from "react";
import { Fetch } from "toolbox/Fetch";
import PostList from "./PostList";


export default function Series() {
  const location = useLocation();
  let state = location.state;
  console.log(state);
  const [targetBoard, setTargetBoard] = useState(state.boardId);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const boardUri = `http://localhost:8080/work/anonymous/listAllSeries/${targetBoard}/1`
  const postListUri = `http://localhost:8080/work/anonymous/findById/0000`;
  
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
      </div>
      )
  }
  