import { useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";
import ReplyList from "./ReplyList";

export default function PostDetails() {
  const thumbnailRequestTarget = ["video", "image"];

  //const { auth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  console.log(state.parentId)
  console.log(state.id)
  //state={{ id:post.id, boardId:state.boardId, page: currentPage, search: txtSearch.current?.value, postListWithPaging}}>

  const postUri = `http://localhost:8080/work/anonymous/findById/${state.id}`;

  return <>
      <Link key={state.parentId} to={`/series/${state.parentId}`} state={state}>목록</Link>
      <Fetch uri={postUri} renderSuccess={renderSuccess} />
  </>
    
    function renderSuccess(post) {
      console.log(post)
      return <>
          
          content : <p>{post.content}</p>
          🧑🏻{post.writer ? post.writer.nick : ""}
          {/*<ThumbnailList imgDtoList={post.listAttachFile}/>*/}
          ✔<span>{post.readCount}</span>
          👍<span>{post.likeCount} with button</span>
          😡<span>{post.dislikeCount}</span>
          🕐<span>{displayDate(post.regDt, post.uptDt)} </span><br/>
          title : <span>{post.title}</span>
          {/*(post.writer ? post.writer.nick === auth.userNick : false) ?
              <Link
                  to="/post/managePost"
                  state={ {post, state} }
              >수정</Link> : ""
          */}
          <br />
          {/*<ReplyList parent={post} />*/}
      </>
  }
  }
  