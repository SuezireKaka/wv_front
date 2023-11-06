import React from 'react'
import { AxiosAuth, Fetch } from 'toolbox/Fetch'
import axios from 'api/axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { useLocation } from 'react-router';
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import OriginalViewOne from "atom/OriginalViewOne";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Favorites from './Favorites';

export default function FavoritesList() {
  const location = useLocation();
  let state = location.state;
  const { auth } = useContext(AppContext);
  const uri = `/work/favoritesAll/1`
  const [postList, setPostList] = useState([]);


  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const [page, setPage] = useState(1);


  const getPostListThenSet = async () => {
    try {
      const { data } = await axios.get(
        `/work/favoritesAll/${page}`,
        {
          headers : {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`
          }
        }
      );
      console.log("읽어온 게시글 목록===%%%%%%%%%", data);
      console.log("읽어온 게시글 목록", data?.firstVal);
      setPostList(postList.concat(data?.firstVal));
    } catch {
      console.error('fetching error');
    }
  };

  //observer 콜백함수
  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        setPage((prev) => prev + 1);
        // 현재 타겟을 unobserve한다.
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    console.log('page ? ', page);
    getPostListThenSet();
  }, [page]);

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer;
    if (lastIntersectingImage) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(randomImageList 배열의 마지막 아이템)으로 지정
      observer.observe(lastIntersectingImage);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingImage]);




    return (
      <Container>
        <Row>
        
          {postList?.map((post, index) => {
            if (index === postList.length - 1) {
              return (
                <Col id={post?.id} ref={setLastIntersectingImage}>
                  {console.log("79줄",page)}
                  {console.log(post)}
                  <Card id={post?.id} style={{ width: '15rem' }} ><br />
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: post.boardVO.id }}>
                    {post.listAttachFile.length===0?
                  <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" thumbnail />
                   :<OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                    </Link>
                      <Card.Body>
                        <Card.Title>{post?.title}
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} auth={auth} renderSuccess={(_, res) => {
                          return <><Favorites favorites={res?.data} post={post}/></>}}/>
                        </Card.Title>
                        {/*<Card.Text>{post?.writer?.nick}</Card.Text> */}
                      </Card.Body>
                      

                  </Card><br />
                </Col>
  
              );
            } else {
              return (
               
                <Col id={post?.id}>
                   {console.log(post.id)}

                    <Card id={post?.id} style={{ width: '15rem' }} ><br />
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: post.boardVO.id }}>
                    {post.listAttachFile.length===0?
                  <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" thumbnail />
                   :<OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                    </Link>
                      <Card.Body>
                        <Card.Title>{post?.title}
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} auth={auth} renderSuccess={(_, res) => {
                          return <><Favorites favorites={res?.data} post={post}/></>}}/>
                        </Card.Title>
                        {/*<Card.Text>{post?.writer?.nick}</Card.Text> */}
                      </Card.Body>
                      
                  </Card><br />
                </Col>
              );
            }
          })}
        </Row>
      </Container>
    );
  }


