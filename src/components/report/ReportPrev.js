import React, { useContext, useState } from 'react'
import AppContext from 'context/AppContextProvider';
import ListSortation from 'components/ListSortation';

export default function ReportPrev() {
    const { auth } = useContext(AppContext);
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const uri = `/report/listAllReports/${page}`
    const [sortation] = useState("report");
    return <><br/><br/><ListSortation  page={page} setPage={setPage}
    postList={postList} setPostList={setPostList}
    uri={uri} sortation={sortation}
    /></>
}