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
                <h1>시작화면 넘기기1</h1>
                <div className="d-none d-md-block">
                    <pre>1111111111111111111111111<br/>
                      1111111111111111<br/>
                      11111111111111111<br/>
                    </pre>
                </div>

            </div>
        </div>
    </Carousel.Item>
    <Carousel.Item>
    <div className='slidercontents'>
            <div className='wrapText'>
                <h1>시작화면 넘기기2</h1>
                <div className="d-none d-md-block">
                    <pre>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ<br/>
                      ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ<br/>
                      ㅁㅁㅁㅁㅁㅁㅁㅁ<br/>

                    </pre>
                </div>
 
            </div>
        </div>
    </Carousel.Item>
    <Carousel.Item>
    <div className='slidercontents'>
            <div className='wrapText'>
                <h1>시작화면 넘기기3</h1>
                <div className="d-none d-md-block">
                    <pre>ㅁㄴㅇㄹ654ㅇㅁㄴ56ㄹ0<br/>
                      ㅁㄴㅇㄹ654ㅇㅁㄴ56ㄹ0ㅁㅇㄴ<br/>
                      ㅁㄴㅇㄹ1654<br/>

                    </pre>
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
