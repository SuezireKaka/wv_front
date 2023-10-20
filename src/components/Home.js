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
    return <> {data?.firstVal.map((series)=>{
      console.log(series.id)
      console.log(series)
  })}
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
