import { useLocation } from "react-router";
import { useState } from "react";
import axios from 'api/axios';
import { useEffect } from "react";
import { Fetch } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";
import PostList from "./PostList";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function Series({data}) {

  const location = useLocation();
  let state = location.state;
  console.log(data);
  console.log(state);


  const [targetBoard, setTargetBoard] = useState(state.seriesId);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);

  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const seriesDetailsUri = `/work/anonymous/findById/${state.seriesId}`;
  const postListUri = `/work/anonymous/listAllPost/${state.seriesId}/1`;

  function SeriesDetailsSuccess(series){
    console.log("1, 3")
    console.log(series.title)
    {/* 이 부분이 첫 번째와 세 번째에 실행됨 */}
    return <>
    <Table responsive variant="white">
      <thead>
        <tr>
          <th colSpan='2'>제목:{series.title}</th>
          {/*<th></th>*/}

        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan='3'>[썸네일 넣을칸]</td>
          <td>작가:{series.writer?.nick}</td>

        </tr>
        <tr>
          {/**<td>2</td> */}
          <td>설명:{series.content}</td>

        </tr>
        <tr>

          <td><Link to={`/series/${state.seriesId}/toolkit`} state={{ seriesId: state.seriesId , page:1}}>
             <button>툴킷으로</button>
           </Link>
          </td>

        </tr>
      </tbody>
    </Table>
      {postListShow(series)}
    </>
  }
  function postListShow(series){
    return (series.repliesList == 0 && !series?.repliesList)
      ? "(게시글이 없습니다)"
      :  <PostList />
  }

  function PostSkinListSuccess(postsPage){
    console.log("2, 4")
    {/* 이 부분이 두 번째와 네 번째에 실행됨 */}
    return <div>
      {postsPage.length == 0
        ? "로딩중....................."
        : postsPage.firstVal.length == 0
        ? "(게시글이 없습니다)"
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
    <br/>
    <div>
      {/*게시글등록링크 만들어야함 - 완성
      <Fetch uri={postListUri} renderSuccess={PostSkinListSuccess}/>
      
      */}
      
    </div>
    
  </>
}
  