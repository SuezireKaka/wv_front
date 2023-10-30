import Home from 'components/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/Showcase';
import Series from 'components/Series';
import ReportMng from 'components/ReportMng';
import PostDetails from 'components/PostDetails';
import Tool from 'components/Tool';
import Agreement from 'login/Agreement';
import LoginStage from 'login/LoginStage';
import Register from 'login/Register';
import UserProfile from 'login/UserProfile';
import MemberList from 'login/MemberList';
import PostMng from 'components/PostMng';
import Test1 from 'example/Test1';
import Test2 from 'example/Test2';
import Test3 from 'example/Test3';
import Test4 from 'example/Test4';
import Test5 from 'example/Test5';
import PostList from 'components/PostList';
import ReportList from 'components/ReportList';
import Post from 'components/Post';
import FavoritesList from 'components/FavoritesList';
import Books from 'components/Books';
import ShowcaseTest from 'components/ShowcaseTest';
import UserSeries from 'login/UserSeries';

export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/agreement"} element={ <Agreement/> } />
          <Route path={"/board/0000"} element={ <Post/> } />
          <Route path={"/board/0001"} element={ <Post/> } />
          <Route path={"/board/:boardId"} element={ <Showcase/> } />
 
          <Route path={"/series/:seriesId/"} element={ <Series/> }/>
          <Route path={"/post/:postId"} element={ <PostDetails/> } />

          <Route path={"/series/mng"} element={ <PostMng/> } />
          <Route path={"/series/:seriesId/mng"} element={ <PostMng/> } />

          <Route path={"/series/:seriesId/report/"} element={ <ReportMng/> } />

          <Route path={"/series/:seriesId/toolkit/"} element={ <Tool/> } />

          <Route path={"/report"} element={ <ReportList/> } />

          <Route path={"/log-in"} element={ <LoginStage/> } />
          <Route path={"/agreement"} element={ <Agreement/> } />
          <Route path={"/register"} element={ <Register/> } />
          <Route path={"/favoritesList"} element={ <FavoritesList/> } />
          <Route path={"/userProfile"} element={ <UserProfile/> } />
          <Route path={"/UserSeries"} element={ <UserSeries /> } />
          
          <Route path={"/memberList/:ownerId"} element={ <MemberList /> } />

          <Route path={"/Books"} element={<Books />} />
          <Route path={"/test1"} element={<Test1 />} />
          <Route path={"/test2"} element={<Test2 />} />
          <Route path={"/Test3"} element={<Test3 />} />
          <Route path={"/test4"} element={<Test4 />} />
          <Route path={"/Test5"} element={<Test5 />} />
        </Routes>
       
      )
}
