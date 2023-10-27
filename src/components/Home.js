import Register from "login/Register";
import LoginStage from "login/LoginStage";
import { useState } from "react";
import { Fetch } from "toolbox/Fetch";
import Post from "./Post";
import Carousel from 'react-bootstrap/Carousel';
import Series from "./Series";
import Test2 from "example/Test2";
import Test5 from "example/Test5";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
import { Container } from "react-bootstrap";
import OriginalViewOne from "atom/OriginalViewOne";
import Col from "react-bootstrap/Row";
import Row from "react-bootstrap/Col";
import CarouselFadeExample from "./CarouselFadeExample";


export default function Home() {
  const [index, setIndex] = useState(0);
  const seriesUri = `/work/anonymous/listAllSeries/0002/1`;

  const renderSuccess = (data) =>{
    console.log(data.firstVal);
    //<OriginalViewOne imgDtoList={post.listAttachFile} x="250" y="250" />
    return <Carousel fade>
    {data.firstVal?.map((post)=>{      
      return <Carousel.Item interval={1000}>
        <OriginalViewOne key={post.id} imgDtoList={post.listAttachFile} x="550" y="auto" />  
    </Carousel.Item>
        })}
    </Carousel> 
  }

  return (
        <Fetch uri={seriesUri} renderSuccess={renderSuccess} />
  )
}
