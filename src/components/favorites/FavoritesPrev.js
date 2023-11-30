import React, { useContext, useState } from 'react'

import AppContext from 'context/AppContextProvider';
import ListSortation from 'components/ListSortation';

export default function FavoritesPrev() {
    const { auth } = useContext(AppContext);
    const [postList, setPostList] = useState([]);

    const [page, setPage] = useState(1);
    const uri = `/work/favoritesAll/${page}`
    const [sortation] = useState("favorites");
    return <ListSortation  page={page} setPage={setPage}
    postList={postList} setPostList={setPostList}
    uri={uri} sortation={sortation}
    />
}