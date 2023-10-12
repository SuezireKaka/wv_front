import Home from 'components/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/Showcase';
import Series from 'components/Series';
import PostDetails from 'components/PostDetails';
import Tool from 'components/Tool';
import Agreement from 'components/Agreement';
import LoginStage from 'login/LoginStage';


export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/agreement"} element={ <Agreement/> } />
          <Route path={"/board/:boardId"} element={ <Showcase/> } />
          <Route path={"/series/:seriesId"} element={ <Series/> } />

          <Route path={"/series/:seriesId/toolkit/"} element={ <Tool/> } />
          <Route path={"/postd"} element={ <PostDetails/> } />
          <Route path={"/log-in"} element={ <LoginStage/> } />
        </Routes>
       
      )
}
