import Carousel from 'react-bootstrap/Carousel';
//import ExampleCarouselImage from 'components/ExampleCarouselImage';
import { AxiosPost } from 'toolbox/Fetch';

function CarouselFadeExample({seriesfile}) {
  console.log(seriesfile)
  function renderImg(afdto, blob){
    const thumbFile = new File([blob.data], "image");
        const imgUrl = (window.URL || window.webkitURL).createObjectURL(thumbFile);
  }



  return (<AxiosPost uri={`/attach/anonymous/getOriginalFile`} body={seriesfile}
  renderSuccess={renderImg} />
  );
  
}

export default CarouselFadeExample;