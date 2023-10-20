import AppContext from "context/AppContextProvider";
import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import PostList from "./PostList";

export default function Post() {
  const location = useLocation();
  let state = location.state;
  const { auth } = useContext(AppContext);
  console.log("시리즈 state");
  console.log(state);
  const [targetBoard, setTargetBoard] = useState(state.seriesId);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);

  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const seriesDetailsUri = `/work/anonymous/findById/${state.boardId}`;
  const postListUri = `/work/anonymous/listAllPost/${state.seriesId}/1`;

  function SeriesDetailsSuccess(post){
    //function SeriesDetailsSuccess(시리즈) <<요부분은 시리즈 대신 포스트로 해서 수정하기 용이하게 함
    console.log("1, 3")
    console.log(post?.id)
    {/* 이 부분이 첫 번째와 세 번째에 실행됨 */}
    return <>
   
      {postListShow(post)}
    </>
  }
  function postListShow(series){
    return (series?.repliesList == 0 && !series?.repliesList)
      ? series?.length===0?"":""
      :  <>
      
      <Link to={`/post/0001${state.boardId}/mng`} state={{seriesId:state.seriesId, state, parentId : state.seriesId, boardId:state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile:[] }}}>
      <button>신규</button>
      </Link>
      <PostList />
      </>
  }

  return <>
    <div>

      <Fetch uri={postListUri} renderSuccess={SeriesDetailsSuccess} />
      
    </div>


  </>
}
  