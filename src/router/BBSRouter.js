
import Home from 'components/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/Showcase';
import Series from 'components/Series';
import PostDetails from 'components/PostDetails';


export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/showcase/:showcaseId"} element={ <Showcase id="" /> } />
          <Route path={"/series/:seriesId"} element={ <Series id="" /> } />
          <Route path={"/post/:postId"} element={ <PostDetails id="" /> } />
        </Routes>
       
      )
}
