import React from "react";
import { Link } from "react-router-dom";

//비교용
const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="flex flex-col items-center h-screen">
      <button>
        <Link to={KAKAO_AUTH_URL}>
          <div className="flex items-center justify-center w-96 h-20 rounded-xl bg-kakao-yellow text-2xl">
            
            <span className="text-center">카카오 1초 로그인/회원가입</span>
          </div>
        </Link>
      </button>
    </div>
  );
};

export default Login;