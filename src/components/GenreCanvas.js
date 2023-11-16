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

export default function GenreCanvas({param}) {
  const { auth } = useContext(AppContext);
  const { genreCodeList } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  const [show, setShow] = useState(false);
  const postListUri = `/work/anonymous/listAllPost/${state?.parentId}/${state?.page}`;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return <div> <>
     <Button variant="primary" onClick={handleShow}>
                장르
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>장르검색</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Link key={param.boardId}to={`/board/${param.boardId}`}>전체</Link>&nbsp;&nbsp;
                    {genreCodeList?.map((gen) => <>
                        <Link key={gen.id} to={`/board/${param.boardId}/${gen.id}`}>{gen?.genre}</Link>&nbsp;&nbsp;
                        
                    </>)}
                </Offcanvas.Body>
            </Offcanvas>
  </></div>


  

}
