import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";
import { useEffect, useRef } from "react";
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
export default function ShowcaseList() {
    const location = useLocation();
    let state = location.state;
    const { auth } = useContext(AppContext);
    console.log("PostListObserver param", state);
    console.log("PostListObserver param", state.boardId);
    const [targetBoard, setTargetBoard] = useState(state.boardId);
  
    const txtSearch = useRef();
  
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
  
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  
    const [byKeyWord, setByKeyWord] = useState(false);
  
    const onSearch = (e) => {
      const search = txtSearch.current.value;
      window.scrollTo({ top: 0 });
      e.preventDefault();
      setPostList([]);
      setPage(1);
      console.log(search);
    };
  
    useEffect(() => {
      console.log(state)
      let search = txtSearch.current.value
      if (search.trim()) {
        getPostListThenSet(`/work/anonymous/search/${state?.boardId}/${search}`)
        setByKeyWord(true)
      } else {
        getPostListThenSet(`/work/anonymous/listAllSeries/${state.boardId}`);
        setByKeyWord(false)
      }
    }, [page])
  
    const getPostListThenSet = async (seriesListUri, isReset) => {
      console.log("여기다 보내고 있네요 : ", seriesListUri + `/${page}`)
      try {
        const { data } = await axios.get(seriesListUri + `/${page}`);
        console.log("읽어온 게시글 목록", data?.firstVal);
        setPostList(isReset ? data?.firstVal : postList.concat(data?.firstVal));
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
  
    return <>
    <table style={{ margin: "auto", position: "static" }} ><td>
      {console.log(auth.roles[0])}
      {!auth.roles || auth.roles.length === 0  ? "" :
        <Link style={{ marginLeft: "auto", position: "relative" }} to={`/series/mng`} state={{ seriesId: state.seriesId, state, parentId: "", boardId: state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile: [] } }}>
          <Button variant="outline-primary">신규</Button>
        </Link>}
        </td><td>
        <Form.Control placeholder="검색어" ref={txtSearch} ></Form.Control>
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
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>
                      {post.listAttachFile?.length === 0 ?
                        <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" thumbnail />
                        : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                    </Link>
                      <Card.Body>
                        <Card.Title>{post?.title}
                        {!auth.roles || auth.roles.length === 0?"":
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} auth={auth} renderSuccess={(_, res) => {
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
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>
                      {post.listAttachFile?.length === 0 ?
                        <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" thumbnail />
                        : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                    </Link>
                      <Card.Body>
                        <Card.Title>{post?.title}
                        {!auth.roles || auth.roles.length === 0?"":
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} auth={auth} renderSuccess={(_, res) => {
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
    </>
}
