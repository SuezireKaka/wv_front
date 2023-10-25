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
  const seriesUri = `/work/anonymous/findById/0000`;




  const renderSuccess = (data) =>{
    console.log(data)
    console.log(data.listAttachFile)
    const seriesfile = data?.listAttachFile;
    //<OriginalViewOne imgDtoList={post.listAttachFile} x="250" y="250" />
    return <> <CarouselFadeExample seriesfile={seriesfile}/>  </>
    
  }


  return (
    <div>
      홈화면
    </div>
  )
}
/*

<Container>
        <Fetch uri={seriesUri} renderSuccess={renderSuccess} />
      </Container>
 */