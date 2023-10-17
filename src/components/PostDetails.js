import { useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";
import ReplyList from "./ReplyList";
import AppContext from "context/AppContextProvider";
import { Accordion } from "react-bootstrap";
import NextPost from "./NextPost";
export default function PostDetails({postList,txtSearch=f=>f}) {
  const thumbnailRequestTarget = ["video", "image"];

  const { auth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  console.log(auth)
  console.log("스테이트 상태는", state)
  console.log(state.parentId)
  console.log(state.id)
  console.log(state.page)
  //state={{ id:post.id, boardId:state.boardId, page: currentPage, search: txtSearch.current?.value, postListWithPaging}}>

  const postUri = `/work/anonymous/findById/${state.id}`;

  return <>
      
      <Fetch uri={postUri} renderSuccess={renderSuccess} />
  </>
    
    function renderSuccess(post) {
      console.log(post)
      console.log("그래도 다시 한 번", state)
      return <>
          {console.log(post)}
          content : <p>{post.content}</p>
          🧑🏻{post.writer ? post.writer.nick : ""}
          {/*<ThumbnailList imgDtoList={post.listAttachFile}/>*/}
          ✔<span>{post.readCount}</span>
          👍<span>{post.likeCount} with button</span>
          😡<span>{post.dislikeCount}</span>
          🕐<span>{displayDate(post.regDt, post.uptDt)} </span><br/>
          title : <span>{post.title}</span><br/>{/*{`/post/${post.id}`} */}
          {console.log(postList)}
          {/* <Link to={`/post/${postList[1]}`} >11</Link>*/}
          <Link key={state.parentId} to={`/series/${state.parentId}`} state={{seriesId:state.parentId, page:state.page}}>목록</Link>&nbsp;
          {(post.writer ? post.writer.nick === auth.nick : false) ?
              <Link
                  to={`/series/${post.id}/mng`}
                  state= {{seriesId:state.seriesId, post, state, parentId : state.parentId}}
              >수정</Link> : ""
          }
          <br />
          {console.log(post)}
          <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>댓글확인</Accordion.Header>
        <Accordion.Body>
          <ReplyList parent={post} state= {{seriesId:state.seriesId, post, state, parentId : state.parentId}}/>
          </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </>
  }
  }
  