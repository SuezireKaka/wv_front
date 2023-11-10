import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Fetch } from 'toolbox/Fetch';
import { useLocation } from 'react-router';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function PostListOffcanvas({post}) {
    const [show, setShow] = useState(false);
    const location = useLocation();
    let state = location.state;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const postListUri = `/work/anonymous/listAllPost/${state.parentId}/${state.page}`;
    const txtSearch = useRef();
    function renderSuccess(postListWithPaging) {
        const postList = postListWithPaging?.firstVal;

        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    캔버스
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{state.parentId}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {postList?.map((post)=>
                            <Link style={{all:"unset", cursor:"pointer"}} key={post.id} to={`/post/${post.id}`} postListWithPaging={postListWithPaging} txtSearch={txtSearch}
                            state={{ id:post.id, page: state.page, search: txtSearch.current?.value, postListWithPaging, parentId:state?.seriesId, boardId:post?.boardVO?.id}}>{/*시리즈아이디필요*/}
                               {post.title}<br/></Link>
                            )}
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }

    return <>
        <div>
            <Fetch uri={postListUri} renderSuccess={renderSuccess} />
        </div>

    </>
}
