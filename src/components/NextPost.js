import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import { Fetch } from 'toolbox/Fetch';
import { useNavigate } from 'react-router-dom';
export default function NextPost({parentId,post,postListWithPaging,txtSearch=f=>f}) {
    const { auth } = useContext(AppContext);
    const location = useLocation();
    let state = location.state;
    console.log(state);
    const postUri = `http://localhost:8080/work/anonymous/findById/${state.id}`;
    let navigate = useNavigate();

    function renderNext(post) {
        console.log(post)
        return navigate(`/post/00000014`,  state={ id:post.id, page: state.page, search: txtSearch.current?.value, postListWithPaging, parentId:post.parentId});
    }

  return (
    <div>
         <Fetch uri={postUri} renderSuccess={renderNext} />


    </div>
  )
}
