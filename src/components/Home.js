import Register from "login/Register";
import LoginStage from "login/LoginStage";
import { useState } from "react";
import { Fetch } from "toolbox/Fetch";

import Carousel from 'react-bootstrap/Carousel';
import Series from "./Series";

import OriginalViewOne from "atom/OriginalViewOne";

export default function Home() {
  const [index, setIndex] = useState(0);
  const postUri = `/work/anonymous/findById/000e`;
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const renderSuccess = (data) =>{
    console.log(data)

    return <> <Carousel>

    <Carousel.Item>
       
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>

    </Carousel.Item>
    <Carousel.Item>
       
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>

    </Carousel.Item>
    <Carousel.Item>
       
       <h3>First slide label</h3>
       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>

   </Carousel.Item>
    </Carousel>
    </>
  }


  return (
    <div>
      <p class="border border-danger-subtle">
      <Fetch uri={postUri} renderSuccess={renderSuccess} />
      
      </p>
    </div>
  )
}
