import AppContext from "context/AppContextProvider";
import { useContext } from 'react';
import { useState, useEffect } from "react";
import axios from "api/axios";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { displayDate } from "toolbox/DateDisplayer";
import OriginalViewOne from "atom/OriginalViewOne";
import Button from "react-bootstrap/Button";

export default function UserSeries() {
    const { auth } = useContext(AppContext);
    const location = useLocation();
    let state = location.state;
    const [page, setPage] = useState(1);
    const [seriesList, setSeriesList] = useState([]);
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
    const getPostListThenSet = async () => {
        try {
            const { data } = await axios.get(`/work/anonymous/listUserSeries/${auth.userId}/${page}`, {
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

    return (
        <div>
            {seriesList.length === 0 ? "" :
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
                                        <td width="60%"><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>{post.title}<br />
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
                                            <td width="60%"><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: state?.post, page: 1, boardId: state?.boardId }}>{post.title}<br />
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
