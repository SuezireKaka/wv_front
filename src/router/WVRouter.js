import Home from 'components/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/Showcase';
import Series from 'components/Series';
import ReportMng from 'components/ReportMng';
import PostDetails from 'components/PostDetails';
import ToolExplorer from 'component-tool/ToolExplorer';
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
import Test6 from 'example/Test6';
import PostList from 'components/PostList';
import ReportList from 'components/ReportList';
import PostNormal from 'components/PostNormal';
import FavoritesList from 'components/FavoritesList';
import Books from 'components/Books';
import UserSeries from 'login/UserSeries';
import LoginHandler from 'kakao-login/LoginHandler';
import ReportDetails from 'components/ReportDetails';
import ToolView from 'component-tool/ToolView';
import NotFound from 'components/NotFound';
export default function WVRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/agreement"} element={ <Agreement/> } />
          <Route path={"/board/0000"} element={ <PostNormal/> } />
          <Route path={"/board/0001"} element={ <PostNormal/> } />
          <Route path={"/board/:boardId"} element={ <Showcase/> } />
          <Route path={"/board/:boardId/:genreId"} element={ <Showcase/> } />

          <Route path={"/series/:seriesId/"} element={ <Series/> }/>
          <Route path={"/post/:postId"} element={ <PostDetails/> } />
          <Route path={"/series/mng"} element={ <PostMng/> } />
          <Route path={"/series/:seriesId/mng"} element={ <PostMng/> } />
          <Route path={"/series/:seriesId/report/"} element={ <ReportMng/> } />
          <Route path={"/series/:seriesId/tool/"} element={ <ToolExplorer/> } />
          <Route path={"/series/:seriesId/tool/:idPath"} element={ <ToolExplorer/> } />
          <Route path={"/series/:seriesId/tool/:idPath/view"} element={ <ToolView/> } />
          <Route path={"/report"} element={ <ReportList/> } />
          <Route path={"/ReportDetails/:ReportId"} element={ <ReportDetails/> } />
          <Route path={"/log-in"} element={ <LoginStage/> } />
          <Route path={"/register"} element={ <Register/> } />
          <Route path={"/favoritesList"} element={ <FavoritesList/> } />
          <Route path={"/userProfile"} element={ <UserProfile/> } />
          <Route path={"/UserSeries"} element={ <UserSeries /> } />
          <Route path={"/memberList/:ownerId"} element={ <MemberList /> } />
          <Route path={"/login/oauth2/code/kakao"}  element={<LoginHandler />}  />
            {/* redirect_url//당신이 redirect_url에 맞춰 꾸밀 컴포넌트*/}
          <Route path={"/Books"} element={<Books />} />
          <Route path={"/test1"} element={<Test1 />} />
          <Route path={"/test2"} element={<Test2 />} />
          <Route path={"/Test3"} element={<Test3 />} />
          <Route path={"/test4"} element={<Test4 />} />
          <Route path={"/Test5"} element={<Test5 />} />
          <Route path={"/Test6"} element={<Test6 />} />
  
          <Route path="*" element={<NotFound/>}/>
        </Routes>
       
      )
}
