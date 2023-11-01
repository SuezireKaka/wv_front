import AppContext from "context/AppContextProvider";
import { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { useState } from "react";
import axios from "api/axios";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ThumbnailList from "atom/ThumbnailList";
import { displayDate } from "toolbox/DateDisplayer";
import OriginalViewOne from "atom/OriginalViewOne";
import Button from "react-bootstrap/Button";
export default function UserSeries() {
    const { auth, setAuth } = useContext(AppContext);
    const location = useLocation();
    let state = location.state;
    const [page, setPage] = useState(1);
    const userSeriesUrl = `/work/anonymous/listUserSeries/${auth.nick}/1`
    const [seriesList, setSeriesList] = useState([]);
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
    const getPostListThenSet = async () => {
        try {
            const { data } = await axios.get(`/work/anonymous/listUserSeries/${auth.nick}/${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });
            console.log("읽어온 멤버 목록", data?.firstVal);
            setSeriesList(seriesList.concat(data?.firstVal));
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
        <div>
            {seriesList.length===0?"":
            <Table responsive variant="white">
                <thead>
                    <th></th>
                    <th>위치</th>
                    <th>내작품보기</th>
                    <th>조회수</th>
                    <th>작성일</th>
                </thead>
                <tbody>
                    {seriesList?.map((post, index) => {
                        if (index === seriesList.length - 1) {
                            return (
                                <tr key={post.id} ref={setLastIntersectingImage}>
                                    <td><OriginalViewOne imgDtoList={post?.listAttachFile} x="100" y="auto" /></td>
                                    <td>{post.boardVO.id}</td>
                                    <td width="60%"><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>{post.title}<br/>
                                            <Button variant="outline-primary" size="sm">작품확인</Button></Link>
                                            <Link style={{ textDecoration: "none", color: "black" }} ><Button variant="outline-warning" size="sm">통계보기</Button></Link>
                                    </td>
                                    <td>✔{post.readCount}</td>
                                    <td>🕐{displayDate(post.regDt, post.uptDt)}</td>
                                </tr>
                            );
                        } else {
                            return (
                                <>
                                    <tr key={post.id}>
                                        <td><OriginalViewOne imgDtoList={post?.listAttachFile} x="100" y="auto" /></td>
                                        <td>{post.boardVO.id}</td>
                                        <td width="60%"><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>{post.title}<br/>
                                                <Button variant="outline-primary" size="sm">작품확인</Button></Link>
                                                <Link style={{ textDecoration: "none", color: "black" }} ><Button variant="outline-warning" size="sm">통계보기</Button></Link>
                                        </td>
                                        <td>✔{post.readCount}</td>
                                        <td>🕐{displayDate(post.regDt, post.uptDt)}</td>
                                    </tr>
                                </>

                            );
                        }
                    })
                    }

                </tbody>
                <tfoot>
                </tfoot>
            </Table>
            }
        </div>
    )
}
