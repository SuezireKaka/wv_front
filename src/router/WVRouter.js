import Home from 'layout/Home';
import { Route, Routes } from 'react-router';
import Showcase from 'components/post/Showcase';
import Series from 'components/post/Series';
import ReportMng from 'components/report/ReportMng';
import PostDetails from 'components/post/PostDetails';
import ToolExplorer from 'components/tool/ToolExplorer';
import Agreement from 'login/Agreement';
import LoginStage from 'login/LoginStage';
import Register from 'login/Register';
import UserProfile from 'login/UserProfile';
import PostMng from 'components/post/PostMng';
import Test2 from 'example/Test2';
import Test3 from 'example/Test3';
import Test4 from 'example/Test4';
import Test5 from 'example/Test5';
import Test6 from 'example/Test6';
import Test7 from 'example/Test7';
import ReportPrev from 'components/report/ReportPrev';
import PostNormal from 'components/post/PostNormal';
import FavoritesPrev from 'components/favorites/FavoritesPrev';
import Books from 'components/post/Books';
import LoginHandler from 'kakao-login/LoginHandler';
import ReportDetails from 'components/report/ReportDetails';
import ToolView from 'components/tool/ToolView';
import NotFound from 'toolbox/NotFound';
import MemberPrev from 'components/member/MemberPrev';
import UserSeriesPrev from 'components/post/UserSeriesPrev';
import WorkStatistics from 'statistics/WorkStatistics';
import DashBoard from 'statistics/DashBoard';

export default function WVRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path={"/agreement"} element={ <Agreement/> } />
          <Route path={"/board/0000"} element={ <PostNormal/> } />
          <Route path={"/board/0001"} element={ <PostNormal/> } />
          <Route path={"/board/:boardId"} element={ <Showcase/> } />
          {/*
          */}
            <Route path={"/board/:boardId/:genreId"} element={ <Showcase/> } /> 
          <Route path={"/series/:seriesId/"} element={ <Series/> }/>
          <Route path={"/series/mng"} element={ <PostMng/> } />
          <Route path={"/series/:seriesId/mng"} element={ <PostMng/> } />
          <Route path={"/series/:seriesId/report/"} element={ <ReportMng/> } />
          <Route path={"/series/:seriesId/tool/"} element={ <ToolExplorer/> } />
          <Route path={"/series/:seriesId/tool/:idPath"} element={ <ToolExplorer/> } />
          <Route path={"/series/:seriesId/tool/:idPath/view"} element={ <ToolView/> } />
          <Route path={"/series/:seriesId/statistics"} element={ <WorkStatistics/> } />
          <Route path={"/post/:postId"} element={ <PostDetails/> } />
          <Route path={"/FavoritesPrev"} element={ <FavoritesPrev/> } />
          <Route path={"/ReportDetails/:ReportId"} element={ <ReportDetails/> } />
          <Route path={"/log-in"} element={ <LoginStage/> } />
          <Route path={"/register"} element={ <Register/> } />

          <Route path={"/ReportPrev"} element={ <ReportPrev/> } />
          
          <Route path={"/userProfile"} element={ <UserProfile/> } />
          <Route path={"/UserSeriesPrev"} element={ <UserSeriesPrev /> } />
          <Route path={"/MemberPrev"} element={ <MemberPrev /> } />
          <Route path={"/login/oauth2/code/kakao"}  element={<LoginHandler />}  />
            {/* redirect_url//당신이 redirect_url에 맞춰 꾸밀 컴포넌트*/}
          <Route path={"/Books"} element={<Books />} />

          <Route path={"/dashboard"} element={<DashBoard/>}/>


          <Route path={"/test2"} element={<Test2 />} />
          <Route path={"/Test3"} element={<Test3 />} />
          <Route path={"/test4"} element={<Test4 />} />
          <Route path={"/Test5"} element={<Test5 />} />
          <Route path={"/Test6"} element={<Test6 />} />
          <Route path={"/Test7"} element={<Test7 />} />
  
          <Route path="*" element={<NotFound/>}/>
        </Routes>
       
      )
}
