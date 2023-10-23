import SeriesSkin from "./SeriesSkin";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";
import ThumbnailList from "atom/ThumbnailList";
import { AxiosPost } from "toolbox/Fetch";
import OriginalFileView from "atom/OriginalFileView";
import OriginalViewList from "atom/OriginalViewList";
import { useEffect } from "react";
import { useState } from "react";
import OriginalViewOne from "atom/OriginalViewOne";
import axios from "api/axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Badge from 'react-bootstrap/Badge';
export default function SeriesCards({data = []}) {
  const location = useLocation();
  let state = location.state;
  console.log("PostListObserver param", state);

  const [targetBoard, setTargetBoard] = useState(state.boardId);

  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);

  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);

  const getPostListThenSet = async () => {
      console.log('fetching 함수 호출됨');
      try {
          const { data } = await axios.get(`/work/anonymous/listAllSeries/${targetBoard}/${page}`);
          console.log("읽어온 게시글 목록", data.firstVal);
          setPostList(postList.concat(data.firstVal));
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
    
                <Col id ={post?.id} ref={setLastIntersectingImage}>
                <Card id ={post?.id} style={{ width: '18rem' }} ><br/>
                <Link style={{ textDecoration: "none", color:"black" } }to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page:1, boardId:state?.boardId}}>

                <OriginalViewOne imgDtoList={post.listAttachFile} x="250" y="350"/>
                    <Card.Body>
                      <Card.Title>{post?.title}</Card.Title>
                      {/*<Card.Text>{post?.writer?.nick}</Card.Text> */}
                    </Card.Body>
                   </Link>   
                  </Card><br/>
                  </Col>

          );
        } else {
          return (
              
        <Col id ={post?.id}>
        <Card id ={post?.id} style={{ width: '18rem' }} ><br/>
                <Link style={{ textDecoration: "none", color:"black" } }to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page:1, boardId:state?.boardId}}>

                <OriginalViewOne imgDtoList={post.listAttachFile} x="250" y="250"/>
                    <Card.Body>
                      <Card.Title>{post?.title}</Card.Title>
                      {/*<Card.Text>{post?.writer?.nick}</Card.Text> */}
                    </Card.Body>
                   </Link>   
                  </Card><br/>
                  </Col>

          );
        }
      })}
      </Row>
    </Container>
  );
}



/*
                <Card id ={post?.id} style={{ width: '18rem' }} >
                <Link style={{ textDecoration: "none", color:"black" } }to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page:1, boardId:state?.boardId}}>

                <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="200"/>
                    <Card.Body>
                      <Card.Title>{post?.title}</Card.Title>
                      <Card.Text>{post?.writer?.nick}</Card.Text>
                    </Card.Body>
                   </Link>   
                  </Card><br/>





















<Container>
                    <Row ref={setLastIntersectingImage}>
                <Col xs={{ order: 12 }}><Card id ={series?.id} style={{ width: '18rem' }} >
                <Link style={{ textDecoration: "none", color:"black" } }to={`/series/${series.id}`} state={{ seriesId: series.id, post: state?.post, page:1, boardId:state?.boardId}}>

                <OriginalViewOne imgDtoList={series.listAttachFile} x="200" y="200"/>
                    <Card.Body>
                      <Card.Title>{series?.title}</Card.Title>
                      <Card.Text>{series?.writer?.nick}</Card.Text>
                    </Card.Body>
                   </Link>   
                  </Card><br/></Col>
                  </Row>
            </Container>
                </>);} else {
                  return (<>
                              <Container>
                    <Row >
                <Col xs={{ order: 12 }}><Card id ={series?.id} style={{ width: '18rem' }} >
                <Link style={{ textDecoration: "none", color:"black" } }to={`/series/${series.id}`} state={{ seriesId: series.id, post: state?.post, page:1, boardId:state?.boardId}}>

                <OriginalViewOne imgDtoList={series.listAttachFile} x="200" y="200"/>
                    <Card.Body>
                      <Card.Title>{series?.title}</Card.Title>
                      <Card.Text>{series?.writer?.nick}</Card.Text>
                    </Card.Body>
                   </Link>   
                  </Card><br/></Col>
                  </Row>
            </Container>


*/