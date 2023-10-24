import { useLocation } from "react-router";
import { useState } from "react";
import axios from 'api/axios';
import { useEffect } from "react";
import { Fetch, AxiosPost, AxiosAuth } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";
import PostList from "./PostList";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import React from "react";
import Checkbox from "toolbox/Checkbox";
import Favorites from "./Favorites";
import AppContext from "context/AppContextProvider";
import { useContext } from "react";
import OriginalViewList from "atom/OriginalViewList";
import OriginalViewOne from "atom/OriginalViewOne";
import Badge from 'react-bootstrap/Badge';
import { FaBullhorn } from "react-icons/fa";

export default function Series() {
  const location = useLocation();
  let state = location.state;
  const { auth } = useContext(AppContext);
  const [targetBoard, setTargetBoard] = useState(state.seriesId);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  console.log(auth);

  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const seriesDetailsUri = `/work/anonymous/findById/${state.seriesId}`;
  const postListUri = `/work/anonymous/listAllPost/${state.seriesId}/1`;
  const favoriteCheckUri = `/work/isFavorites/${state.seriesId}`;

  function SeriesDetailsSuccess(post){
    //function SeriesDetailsSuccess(시리즈) <<요부분은 시리즈 대신 포스트로 해서 수정하기 용이하게 함

    {/* 이 부분이 첫 번째와 세 번째에 실행됨 */}
    return <>
    <Table responsive variant="white">
      <thead>
        <tr>
          <th colSpan='2'>{post.title}&nbsp;&nbsp;
          {/**/}
          {!auth.roles || auth.roles.length === 0?"":
            <AxiosAuth uri={favoriteCheckUri} auth={auth} renderSuccess={(_, res) => {
              return <><Favorites favorites={res?.data}/></>
            }}/>}
            
          
          </th>
          {/*<th></th>*/}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan='4' width="40%"><OriginalViewOne imgDtoList={post.listAttachFile} x="300" y="300"/></td>
          <td>작가:{post.writer?.nick}</td>
        </tr>
        <tr>
          {/**<td>2</td> */}
          <td rowSpan='2'>설명:{post.content}</td>
        </tr>
        <tr>
          
        </tr>
        <tr>
          <td>
            
          {(post.writer ? post.writer.nick === auth.nick : false) ?
          <Link to={`/series/${state.seriesId}/mng`} state={{seriesId:state.seriesId, post: post, state, parentId : "", boardId:state.boardId}}>
             <button>수정</button>
           </Link>
           : ""}
          <Link to={`/series/${state.seriesId}/toolkit`} state={{ seriesId: state.seriesId , page:1}}>
            <button>툴킷으로</button>
          </Link>
          {auth && auth.nick
          ? <Link to={`/series/${state.seriesId}/report`} state={{ seriesId: state.seriesId , page:1}}>
            <button>{"신고하기 "}<FaBullhorn color="tomato"/></button>
          </Link>
          :""
          }
          
          </td>
        </tr>
      </tbody>
    </Table>
      {postListShow(post)}
    </>
  }
  function postListShow(series){
    return (series?.repliesList == 0 && !series?.repliesList)
      ? series?.length===0?"":""
      :  <>
      
      <Link to={`/series/${state.seriesId}/mng`} state={{seriesId:state.seriesId, state, parentId : state.seriesId, boardId:state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile:[] }}}>
      <button>신규</button>
      </Link>
      <PostList />
      </>
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
     
  </>
}
  