import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const code = new URL(window.location.href).searchParams.get("code");

const SocialKakao = ()=>

{
    const Rest_api_key='248bbf725d08a367356e79cf03f2859a' //REST API KEY
    const redirect_uri = 'http://localhost:3000/' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const kakaoURL2 = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}`

    const handleLogin = ()=>{
        window.location.href = kakaoURL
        window.location.href = kakaoURL2


    }
    return(
    <>
    <button onClick={handleLogin}>카카오 로그인</button>
    </>
    )
}
console.log(code)  //iG19UD4deaUvgboI5XRJI0gxCrspahntJB-qY_14rftjqAeukjkKD0rE4RAKPXLqAAABi0e--pLSDh85zpcCzQ
export default SocialKakao