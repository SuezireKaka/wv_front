import React from 'react'
import { useState } from 'react';

export default function PostCnt({post, onLike=f=>f, onClickLike=f=>f, nowLike}) {
 
  return (
    <div onClick={() => { onClickLike(post.id, post.likeCount) }}>[{nowLike}]</div>
  )
}
