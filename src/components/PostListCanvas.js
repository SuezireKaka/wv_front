import Register from "login/Register";
import LoginStage from "login/LoginStage";
import { useState } from "react";
import { Fetch } from "toolbox/Fetch";
import { Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Carousel from 'react-bootstrap/Carousel';
import Series from "./Series";
import { useContext } from "react";
import { useLocation } from "react-router";
import AppContext from "context/AppContextProvider";
import { Link } from "react-router-dom";

export default function PostListCanvas({ txtSearch = f => f }) {
  const { auth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  const [show, setShow] = useState(false);
  const postListUri = `/work/anonymous/listAllPost/${state?.parentId}/${state?.page}`;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function renderSuccess(postListWithPaging) {

    const postList = postListWithPaging?.firstVal;
  return <div> <>
     <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {postList?.map((post)=>(<>
         <Link style={{all:"unset"}} key={post.id} to={`/post/${post?.id}`} postListWithPaging={postListWithPaging} txtSearch={txtSearch}
                          state={{ id:post.id, page: state.page, search: txtSearch.current?.value, postListWithPaging, parentId:state?.seriesId, boardId:post?.boardVO?.id}}>
          {post?.title}<br/></Link>
          </>))}
        </Offcanvas.Body>
      </Offcanvas>
  </></div>


  }

  return (
    <Fetch uri={postListUri} renderSuccess={renderSuccess} />
  )
}
