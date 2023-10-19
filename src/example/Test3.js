//코드 : s8RSZRXjVAVEo89ooY-W8_5Ppvvm77gVJHDNceiUA1dyijaLB31_CBysguoKKiVPAAABi0g273CSBpCp5rpDbg
//인가코드 : DtPobRyRaxcUjwWaVViDAHoB0TQEuydNcMopEkso3fcQvCmSeuWVy16rnhwKPXRpAAABi0hssXXDukuslKNZWg
const code = new URL(window.location.href).searchParams.get("code");
const Test3 = ()=>

{
    const Rest_api_key='248bbf725d08a367356e79cf03f2859a' //REST API KEY
    const redirect_uri = 'http://localhost:3000/Test3' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    console.log(code)
    let 코드 = new URL(window.location.href).searchParams.get('DtPobRyRaxcUjwWaVViDAHoB0TQEuydNcMopEkso3fcQvCmSeuWVy16rnhwKPXRpAAABi0hssXXDukuslKNZWg')
    console.log(코드)
    return(
    <>

    <button onClick={handleLogin}>카카오 로그인</button>
    </>
    )
}
export default Test3
