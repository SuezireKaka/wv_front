import Register from "login/Register";
import LoginStage from "login/LoginStage";
import { useState } from "react";
import { Fetch } from "toolbox/Fetch";
import Carousel from 'react-bootstrap/Carousel';
import Series from "./Series";
import Test2 from "example/Test2";
import Test5 from "example/Test5";
import { Container } from "react-bootstrap";
import OriginalViewOne from "atom/OriginalViewOne";
import Col from "react-bootstrap/Row";
import Row from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useRef } from "react";
import HomePlus from "./HomePlus";


export default function Home() {
  const [index, setIndex] = useState(0);
  const seriesUri = `/work/anonymous/listAllSeries/0002/1?genreId=`;
  const seriesUri2 = `/work/anonymous/listAllSeries/0003/1?genreId=`;
  const postUri = `/work/anonymous/listAllPost/0000/1`;
  const txtSearch = useRef();

  const navMenu = {
    color: "grey",
    textDecoration: "none",

  }



  const renderSuccess = (data) => {

    return (
      <Carousel fade>{/* */}
        {data?.firstVal?.map((post) => {
          return (
            <Carousel.Item interval={3000}>
              <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: "0002" }}>
            {post.listAttachFile?.length === 0 ?
              <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`}  width="500" height="700" />
              : <OriginalViewOne key={post.id} imgDtoList={post.listAttachFile} x="500" y="700"  />}
              </Link>
          </Carousel.Item>
        )})}
      </Carousel>
    )
  }

  const renderSuccess2 = (data) => {

    return (
      <Carousel>{/* */}
        {data?.firstVal?.map((post) => {
          return (
            <Carousel.Item interval={1500} >
              <Link style={{ textDecoration: "none", color: "black", overflow:"hidden" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: "0002" }}>
            {post.listAttachFile?.length === 0 ?
            <div   class="clipmain">
              <Image  src={process.env.PUBLIC_URL + `/images/WVseries.jpg`}  width="550px" height="700px" class="clipmain" /></div>
              : <OriginalViewOne key={post.id}  imgDtoList={post.listAttachFile} x="550px"  y="700px" d="clipmain"  />}
              </Link>
          </Carousel.Item>
        )})}
      </Carousel>
    )
  }


  const renderSuccessPost = (postListWithPaging) => {
    const postList = postListWithPaging?.firstVal;
    const pagenation = postListWithPaging?.secondVal;
    let postList2 = postList?.filter((post, i) => i < 7);

    return (<>
      <Table striped bordered hover variant="white"  width="550px" height="300px" border="2px">
        <th><Link  style={{ textDecoration: "none", color: "black" }} to={`/board/0000`}
            state={{ boardId: "0000", page: 1 }}>공지사항</Link></th>
        {postList2?.map((post, i) =>
          <tr >
            <td>
              <Link style={{ all: "unset", cursor: "pointer" }} key={post.id} to={`/post/${post.id}`} postListWithPaging={postListWithPaging} txtSearch={txtSearch}
                state={{ id: post.id, page: 1, search: txtSearch.current?.value, postListWithPaging, seriesId: "0000", parentId: "0000", boardId: post?.boardVO?.id, likeCount: post.likeCount }}>{/*시리즈아이디필요*/}
                {post.title}</Link>
            </td>
          </tr>
        )}
      </Table>
      </>
    )
  }

  return (<>
    <table>
      <tr>
        <td width="10%"></td>
        <td rowSpan='2' width="550px" height="700px" >
          <Fetch uri={seriesUri} renderSuccess={renderSuccess} />
        </td>

        <td width="5%"></td>
        <td width="550px" height="300px" >
          <Fetch uri={postUri} renderSuccess={renderSuccessPost} />
          <tr width="550px" height="300px" ><Fetch uri={seriesUri2} renderSuccess={renderSuccess2} /></tr>
        </td>
        
        
      </tr>
    </table >
  </>
  )
}
