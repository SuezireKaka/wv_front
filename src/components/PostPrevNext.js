import React from 'react'
import { useState } from 'react';
import { AiOutlineCaretLeft } from "react-icons/ai";
import { AiOutlineCaretRight } from "react-icons/ai";
import { Fetch } from 'toolbox/Fetch';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function PostPN({ post, state }) {
    const uri = `/work/anonymous/getPrevAndNext/${post.id}`
    console.log(post.id)
    console.log(state.id)
    console.log("스테이트", state)
    function renderSuccess(data) {
        console.log(data)
        const prev = data?.firstVal
        const next = data?.secondVal
        console.log(prev?.id)
        console.log(next?.id)

        return <>
        {prev===null?<Button variant="outline-dark" disabled>이전화 X</Button>:
        <Button variant="outline-dark">
        <Link style={{all:"unset"}} key={post.id} to={`/post/${prev?.id}`}
                          state={{ id:prev?.id, page: state.page, seriesId:state?.parentId, parentId:state?.parentId, boardId:post?.boardVO?.id}}>
                             이전화<AiOutlineCaretLeft color="red" /></Link></Button>}
                             {post.title}
        {next===null?<Button variant="outline-dark" disabled>X 다음화</Button>:                
        <Button variant="outline-dark"><Link style={{all:"unset"}} key={post.id} to={`/post/${next?.id}`}
                          state={{ id:next?.id, page: state.page, seriesId:state?.parentId, parentId:state?.parentId, boardId:post?.boardVO?.id}}>
                             <AiOutlineCaretRight color="red" />다음화</Link></Button>}
        </>
    }


    return (
        <div>
            <Fetch uri={uri} renderSuccess={renderSuccess} />
        </div>
    )
}
