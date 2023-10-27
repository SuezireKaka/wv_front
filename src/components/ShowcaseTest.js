import OriginalViewOne from "atom/OriginalViewOne";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import axios from "api/axios";

export default function ShowcaseTest() {

    const [page, setPage] = useState(1);
    const location = useLocation();
    let state = location.state;
    const [seriesListUri, setSeriesListUri] = useState(`/work/anonymous/listAllSeries/0003/${page}`);
    const txtSearch = useRef("");
    const [byKeyWord, setByKeyWord] = useState(false);
    const [postList, setPostList] = useState([]);
    console.log(state);
    console.log(seriesListUri);

    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);

    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    const getPostListThenSet = async () => {
        try {
            const { data } = await axios.get(`/work/anonymous/listAllSeries/${state?.boardId}/${page}`);
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

    const onSearch = (e) => {
        const search = txtSearch.current.value;
        e.preventDefault();
        setPage(1);
        console.log(search);
        if (search.trim()) {
            setByKeyWord(true)
            const postSearchListUri = `/work/anonymous/search/${state?.boardId}/${search}/${page}`;
            setSeriesListUri(postSearchListUri);
        } else {
            setByKeyWord(false)
            setSeriesListUri(`/work/anonymous/listAllSeries/${state?.boardId}/${page}`);
        }
    };

    const renderSuccess = (data) => {
        const postList = data?.firstVal;
        console.log(postList);
        return (
            <Container>
                <Row>
                    {console.log(data.firstVal)}
                    {postList?.map((post, index) => {
                        if (index === postList.length - 1) {
                            return (
                                <Col id={post?.id} ref={setLastIntersectingImage}>
                                    <Card id={post?.id} style={{ width: '18rem' }} ><br />
                                        <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>
                                            <OriginalViewOne imgDtoList={post.listAttachFile} x="250" y="auto" />
                                            <Card.Body>
                                                <Card.Title>{post?.title}</Card.Title>
                                                {/*<Card.Text>{post?.writer?.nick}</Card.Text> */}
                                            </Card.Body>
                                        </Link>
                                    </Card><br />
                                </Col>
                            );
                        } else {
                            return (
                                <Col id={post?.id}>
                                    {console.log(post)}
                                    <Card id={post?.id} style={{ width: '18rem' }} ><br />
                                        <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>
                                            <OriginalViewOne imgDtoList={post.listAttachFile} x="250" y="250" />
                                            <Card.Body>
                                                <Card.Title>{post?.title}</Card.Title>
                                                {/*<Card.Text>{post?.writer?.nick}</Card.Text> */}
                                            </Card.Body>
                                        </Link>
                                    </Card><br />
                                </Col>
                            );
                        }
                    })}
                </Row>
            </Container>
        )
    }



    return (
        <>
            <div className="Question">
                <form>
                    <input placeholder="검색어" ref={txtSearch}></input>
                    <button onClick={onSearch}>검색</button>
                </form>
                <Link to={`/series/mng`} state={{ seriesId: state.seriesId, state, parentId: "", boardId: state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile: [] } }}>
                    <Button variant="outline-primary">신규</Button><br /><br />
                </Link>
                <Fetch uri={seriesListUri} renderSuccess={renderSuccess} />
            </div>
        </>
    )




}
