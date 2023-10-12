import Home from 'components/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/Showcase';
import Series from 'components/Series';
import PostDetails from 'components/PostDetails';
import Tool from 'components/Tool';


export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/board/:boardId"} element={ <Showcase/> } />
          <Route path={"/series/:seriesId"} element={ <Series/> } />
          <Route path={"/tool/"} element={ <Tool/> } />
          <Route path={"/post/:loginId"} element={ <PostDetails/> } />
        </Routes>
       
      )
}
