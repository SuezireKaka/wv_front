import Home from 'components/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/Showcase';
import Series from 'components/Series';
import PostDetails from 'components/PostDetails';
import Tool from 'components/Tool';
import Agreement from 'components/Agreement';
import LoginStage from 'login/LoginStage';
import Register from 'login/Register';
import UserProfile from 'login/UserProfile';
import MemberList from 'login/MemberList';


export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/agreement"} element={ <Agreement/> } />
          <Route path={"/board/:boardId"} element={ <Showcase/> } />
          <Route path={"/series/:seriesId"} element={ <Series/> } />
          <Route path={"/post/:postId"} element={ <PostDetails/> } />

          <Route path={"/series/:seriesId/toolkit/"} element={ <Tool/> } />
          <Route path={"/log-in"} element={ <LoginStage/> } />
          <Route path={"/Agreement"} element={ <Agreement/> } />
          <Route path={"/register"} element={ <Register/> } />
          

          <Route path={"/userProfile"} element={ <UserProfile/> } />
          
          <Route path={"/MemberList/:ownerId"} element={ <MemberList /> } />

        </Routes>
       
      )
}
