import React, { useState } from 'react'
import ListSortation from 'components/ListSortation';

export default function MemberPrev() {
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const uri = `/party/listAllAccount/0000/${page}/id`
    const [sortation] = useState("member");

    return <><br/><br/><ListSortation  page={page} setPage={setPage}
    postList={postList} setPostList={setPostList}
    uri={uri} sortation={sortation}
    /></>
}