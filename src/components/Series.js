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
  const [targetBoard, setTargetBoard] = useState(state.seriesId);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const seriesDetailsUri = `http://localhost:8080/work/anonymous/findById/${state.seriesId}`;
  const postListUri = `http://localhost:8080/work/anonymous/listAllPost/${state.seriesId}/1`;

  function SeriesDetailsSuccess(series){
    console.log("1, 3")
    {/* 이 부분이 첫 번째와 세 번째에 실행됨 */}
    return <>
      시리즈
      [썸네일 넣을칸]<br/><br/><br/>
      제목:{series.title}<br/>
      설명:{series.content}<br/>
      작가:{series.writer?.nick}<br/><br/>
    </>
  }
  function PostSkinListSuccess(postsPage){
    console.log("2, 4")
    {/* 이 부분이 두 번째와 네 번째에 실행됨 */}
    return <div>
      {postsPage.length == 0
        ? "로딩중....................."
        : postsPage.firstVal.map(postSkin => {
          return <div>
            {"제목 : " + postSkin.title} 
          </div>
        })
      }
    </div>
  }

  return <>
    <div>
      <Fetch uri={seriesDetailsUri} renderSuccess={SeriesDetailsSuccess} />
    </div>
    <div>
      게시글등록링크 만들어야함
      <Fetch uri={postListUri} renderSuccess={PostSkinListSuccess}/>
    </div>
    
  </>
}
  