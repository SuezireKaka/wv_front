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



export default function Home() {
  const [index, setIndex] = useState(0);
  const seriesUri = `/work/anonymous/listAllSeries/0002/1`;

  const renderSuccess = (data) => {
    console.log(data.firstVal);

    return (
      <table><tr></tr><tr><td width="20%"></td><td rowSpan='2' width="550px">
        <Carousel fade>
          {data.firstVal?.map((post) => {
            return <Carousel.Item interval={1500}>
              <OriginalViewOne key={post.id} imgDtoList={post.listAttachFile} x="550" y="auto" />
            </Carousel.Item>
          })}
        </Carousel>
      </td><td></td></tr>
      </table>)
  }

  return (
    <Fetch uri={seriesUri} renderSuccess={renderSuccess} />
  )
}
