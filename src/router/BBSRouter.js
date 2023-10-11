
import Home from 'components/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/Showcase';
import Series from 'components/Series';
import PostDetails from 'components/PostDetails';


export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/board/0004"} element={ <Showcase/> } />
          <Route path={"/series/"} element={ <Series/> } />
          <Route path={"/post/:loginId"} element={ <PostDetails/> } />
        </Routes>
       
      )
}
