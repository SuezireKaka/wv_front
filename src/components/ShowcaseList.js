import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";
import { useEffect, useRef, useMemo } from "react";
import { useState } from "react";
import OriginalViewOne from "atom/OriginalViewOne";
import axios from "api/axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from 'react-bootstrap/Image';
import AppContext from "context/AppContextProvider";
import { useContext } from "react";
import { Form } from "react-bootstrap";
import Favorites from './Favorites';
import { AxiosAuth } from 'toolbox/Fetch'
import GenreButton from "./GenreButton";

export default function ShowcaseList({page, setPage=f=>f, postList, setPostList=f=>f, lastIntersectingImage, setLastIntersectingImage=f=>f,
  listAttachFile, setByKeyWord=f=>f, isSeries,txtSearch,onSearch=f=>f}) {
    const param = useParams();
    console.log("PostListObserver param", param);
    
    useEffect((e) => {

      window.scrollTo({ top: 0 });
      setPage(1)

    },[param.boardId])

    const location = useLocation();
    let state = location.state;
    const { auth } = useContext(AppContext);

    //const [targetBoard, setTargetBoard] = useState(state?.boardId);


    useEffect(() => {
      const search = txtSearch.current.value
      if (search.trim()) {
        console.log("search")
        getPostListThenSet(`/work/anonymous/search/${param?.boardId}/${search}`)

        setByKeyWord(true)
      } else {
        console.log("여기 들어오냐? 여긴 써치 아님")
        getPostListThenSet(`/work/anonymous/listAllSeries/${param?.boardId}`);
        setByKeyWord(false)
      }
    }, [page])
  
    

    const getPostListThenSet = async (seriesListUri, isReset) => {
      //console.log("여기다 보내고 있네요 2222 : ", seriesListUri + `/${page}?genreId=${param?.genreId ? param?.genreId : ""}`)
      try {
        const { data } = await axios.get(seriesListUri + `/${page}?genreId=${param?.genreId ? param?.genreId : ""}`);
        console.log("읽어온 게시글 목록", data?.firstVal);
        setPostList(isReset ? data?.firstVal : postList?.concat(data?.firstVal));
        //console.log(postList);

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
  
    useMemo(() => { 
      async function recall() {
        try {
          //console.log("뭐가 문제인데?", param, param?.boardId, param?.genreId ? param?.genreId : "")
          //console.log("여기서 다시 가져오는 거야", `/work/anonymous/listAllSeries/${param?.boardId}/1/?genreId=${param?.genreId ? param?.genreId : ""}`)
          const { data } = await axios.get(`/work/anonymous/listAllSeries/${param?.boardId}/1?genreId=${param?.genreId ? param?.genreId : ""}`);
          console.log("다시 불러온 게시글 목록", data?.firstVal);
          setPostList(data?.firstVal);

        } catch {
          console.error('fetching error');
        }
      }
      recall()
    }, [param]);
/*
    useEffect(() => {
      console.log("유즈이펙트 너 실행되냐")
      getPostListThenSet(`/work/anonymous/listAllSeries/${param?.boardId}`);

    }, [page]);
  */
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

    //console.log(page)

    //if (!page){return <></>}
    //else{
    return <>
    {/*

      function
      <GenreSelector initGenre={genre} onChange={onChange}/>

      function GenreSelector({initGenre}) {
       {page, setPage} = useContext(ShowcaseContext)
       
      }
     */}
    <table style={{ margin: "auto", position: "static" }} ><td>
      {/*<GenreButton />*/}
      </td><td>
      {!auth.roles || auth.roles.length === 0  ? "" :
        <Link to={`/series/mng`} state={{ seriesId: "",  parentId: "", boardId: param?.boardId, post : {listAttachFile: listAttachFile, genreList:[]},isSeries:isSeries}}>
          <Button variant="outline-primary">신규</Button>
        </Link>}
        </td><td>
        <Form.Control type="text" placeholder="검색어" ref={txtSearch} ></Form.Control>
        </td><td>
        <Button variant="outline-danger" onClick={onSearch}>
          검색
        </Button>
      </td>
      </table>
      <Container>
        <Row>
          {postList?.map((post, index) => {
            if (index === postList?.length - 1) {
              return (
  
                <Col id={post?.id} ref={setLastIntersectingImage}>
                  <Card id={post?.id} style={{ width: '15rem' }} ><br />
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, page: 1, boardId: param?.boardId }}>
                      {post.listAttachFile?.length === 0 ?
                        <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" rounded />
                        : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                    </Link>
                      <Card.Body>
                        <Card.Title>{post?.title}
                        {!auth.roles || auth.roles.length === 0?"":
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} auth={auth} renderSuccess={(res) => {
                          return <><Favorites favorites={res?.data} post={post}/></>}}/>}
                        </Card.Title>
                        {/*<Card.Text>{post?.writer?.nick}</Card.Text> */}
                      </Card.Body>
                  </Card><br />
                </Col>
  
              );
            } else {
              return (
  
                <Col id={post?.id}>
                  <Card id={post?.id} style={{ width: '15rem' }} ><br />
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, page: 1, boardId: param?.boardId }}>
                      {post.listAttachFile?.length === 0 ?
                        <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" rounded />
                        : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                    </Link>
                      <Card.Body>
                        <Card.Title>{post?.title}
                        {!auth.roles || auth.roles.length === 0?"":
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} auth={auth} renderSuccess={(res) => {
                          return <><Favorites favorites={res?.data} post={post}/></>}}/>}
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
    </>//}
}
