import { useLocation, useNavigate } from "react-router";
import React, { useState, useContext } from "react";
import axios from 'api/axios';
import { Fetch, AxiosAuth } from "toolbox/Fetch";
import PostList from "./PostList";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Favorites from "./Favorites";
import AppContext from "context/AppContextProvider";
import OriginalViewOne from "atom/OriginalViewOne";
import { FaBullhorn } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import LoginTypeIcon from "toolbox/LoginTypeIcon";

export default function Series() {
  const location = useLocation();
  let state = location.state;
  const { auth } = useContext(AppContext);
  const navigate = useNavigate();
  const seriesDetailsUri = `/work/anonymous/findById/${state.seriesId}`;
  const favoriteCheckUri = `/work/isFavorites/${state.seriesId}`;
  const [isSeries, setIsSeries] = useState(true);
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.delete(`/work/${state.seriesId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth.accessToken}`
          }
        });
    } catch (err) {
      console.log('Delete Failed', err);
    } finally {
      navigate(-1, { state: state });
    }
  }

  function SeriesDetailsSuccess(post) {
    return <>
      <Table responsive variant="white">
        <thead>
          <tr>
            <th colSpan='2'>{post.title}&nbsp;&nbsp;
              {/**/}
              {!auth.roles || auth.roles.length === 0 ? "" :
                <AxiosAuth uri={favoriteCheckUri} auth={auth} renderSuccess={(res) => {
                  console.log("그래서 좋다는 거지?", res)
                  return <><Favorites favorites={res?.data} post={post} /></>
                }} />}


            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan='5' width="40%"><OriginalViewOne imgDtoList={post.listAttachFile} x="300" y="auto" /></td>
            <td><LoginTypeIcon loginType={post?.writer?.accountType} />{!post.writer?.nick ? post.writer?.kakaoNick : post.writer?.nick}</td>
          </tr>
          <tr>
            <td rowSpan='2'>설명:{post.content}</td>
          </tr>
          <tr>

          </tr>
          <tr>
            <td>{post?.genreList?.map((genre) => <>#{genre.genre} </>)}</td>
          </tr>
          <tr>
            <td>

              {(post.writer ? post.writer.id === auth.userId : false) || (auth.roles[0] === "admin" || auth.roles[0] === "manager") && state?.isReport ? <>
                <Link to={`/series/${state.seriesId}/mng`} state={{ seriesId: state.seriesId, post: post, state, parentId: "", boardId: state.boardId, isSeries: isSeries }}>
                  <Button variant="outline-info">수정</Button>
                </Link><Button variant="outline-dark" onClick={handleDelete}>삭제</Button>
              </>
                : ""}
              {auth && auth.loginId
                ? <>
                  <Link to={`/series/${state.seriesId}/tool`} state={{ seriesId: state.seriesId, writer: post.writer, page: 1, toolId: "", addr: "" }}>
                    <Button variant="outline-success">툴 목록</Button>
                  </Link>
                  <Link to={`/series/${state.seriesId}/report`} state={{ report: { listAttachFile: [] }, suspectId: state.seriesId, suspectTable: "T_work" }}>
                    <Button variant="outline-danger">신고 <FaBullhorn color="tomato" /></Button>
                  </Link>
                </>
                : ""
              }

            </td>
          </tr>
        </tbody>
      </Table>
      {(post?.repliesList == 0 && !post?.repliesList)
        ? post?.length === 0 ? "" : ""
        : <>
          {(post.writer ? post.writer.id === auth.userId : false) ?
            <Link to={`/series/${state.seriesId}/mng`} state={{ seriesId: state.seriesId, state, parentId: state.seriesId, boardId: state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile: [] } }}>
              <Button variant="outline-primary">신규</Button>
            </Link> : ""}
          <hr />
          <PostList />
        </>}
    </>
  }

  return <>
    <div>
      <Fetch uri={seriesDetailsUri} renderSuccess={SeriesDetailsSuccess} />
    </div>

  </>
}
