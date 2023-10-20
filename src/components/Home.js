import Register from "login/Register";
import LoginStage from "login/LoginStage";
import { useState } from "react";
import { Fetch } from "toolbox/Fetch";

import Carousel from 'react-bootstrap/Carousel';
import Series from "./Series";


export default function Home() {
  const [index, setIndex] = useState(0);
  const LIST_ALL_SERIES_URI = `/work/anonymous/listAllSeries/0002/1`
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const renderSuccess = (data) =>{
    console.log(data)
    console.log(data?.firstVal)
    return <> <Carousel>
    <Carousel.Item>
        <div className='slidercontents'>
            <div className='wrapText'>
                <h1>시작화면 넘기기</h1>
                <div className="d-none d-md-block">
                    <p>1111111111111111111111111
                      1111111111111111
                      11111111111111111
                    </p>
                </div>

            </div>
        </div>
    </Carousel.Item>
    <Carousel.Item>
    <div className='slidercontents'>
            <div className='wrapText'>
                <h1>시작화면 넘기기</h1>
                <div className="d-none d-md-block">
                    <p>222222222222222
                      22222222222
                      2222222222

                    </p>
                </div>
 
            </div>
        </div>
    </Carousel.Item>
</Carousel>
</>
  }


  return (
    <div>
      <p class="border border-danger-subtle">
      <Fetch uri={LIST_ALL_SERIES_URI} renderSuccess={renderSuccess}/>
      
      </p>
    </div>
  )
}
