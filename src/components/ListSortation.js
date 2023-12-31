import React, { useEffect, useContext, useState } from 'react'
import axios from 'api/axios';
import AppContext from 'context/AppContextProvider';
import FavoritesList from './favorites/FavoritesList';
import ReportList from './report/ReportList';
import MemberList from './member/MemberList';
import UserSeries from './post/UserSeries';

export default function ListSortation({
    uri,sortation,
    page, setPage = f => f,
    postList, setPostList = f => f,
}) {
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
    const { auth } = useContext(AppContext);
    const getPostListThenSet = async () => {
      try {
        const { data } = await axios.get(
            uri,
          {
            headers: {
              'Content-Type': 'application/json',
              "x-auth-token": `Bearer ${auth?.accessToken}`
            }
          }
        );
  
        setPostList(postList.concat(data?.firstVal));
      } catch {
        console.error('fetching error');
      }
    };
    
    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
          observer.unobserve(entry.target);
        }
      });
    };
  
    useEffect(() => {
      console.log('page ? ', page);
      getPostListThenSet();
    }, [page]);
  
    useEffect(() => {
      let observer;
      if (lastIntersectingImage) {
        observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
        observer.observe(lastIntersectingImage);
      }
      return () => observer && observer.disconnect();
    }, [lastIntersectingImage]);
  
    console.log(sortation);
  return (<>
    {sortation==="favorites"?
    <FavoritesList dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    {sortation==="report"?
    <ReportList dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    {sortation==="member"?
    <MemberList dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    {sortation==="userSeries"?
    <UserSeries dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    </>
  )
}
