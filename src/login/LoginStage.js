import { useRef, useState, useEffect, useContext } from 'react';
import AppContext from 'context/AppContextProvider';
import { Link } from 'react-router-dom';

const LOGIN_URL = 'http://localhost:8080/party/anonymous/sign-in';

const LoginStage = () => {
    const { setAuth } = useContext(AppContext);
    const loginIdRef = useRef();
    const passWordRef = useRef();

    const [loginId, setLoginId] = useState("");
    const [passWord, setPassWord] = useState("");
    const [signInResult, setSignInResult] = useState({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage('');
    }, [loginId, passWord])

    useEffect(() => {
        loginIdRef.current.focus();
    }, [])

    const signIn = async (e) => {
        e.preventDefault();

        console.log(loginId, passWord);
        
        await fetch(LOGIN_URL,
            {
                method : "Post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({loginId : loginId, passWord : passWord})
            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            {/*if (data.code === 0) {
                setSignInResult(data);
                const accessToken = data.token;
                const roles = data.roles;
                const name = data.userName;
                setAuth({ nick, roles, name, accessToken });
                {/*window.sessionStorage.setItem("nowUser", JSON.stringify({ nick, roles, name, accessToken }));
            }
            else {
                alert("아이디 또는 패스워드가 바르지 않습니다!");
                pswdRef.current.focus();
            };*/}
            // 데이터가 있고 그 데이터의 코드가 0이면 성공!
            setSuccess(data && data.code === 0);
        })
        .catch(error => {
            setError(true);
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
        });
    }

    return success
        ? null
        : <div className="TopUserInfo">
            {error
            ? <p>{errorMessage}</p>
            : null}
            <form onSubmit={signIn}>
                login id : <input type="text"
                id="loginId"
                ref={loginIdRef}
                autoComplete="off"
                onChange={(e) => setLoginId(e.target.value)}
                value={loginId}
                required
            />
            <br></br>
            password : <input type="password"
                id="passWord"
                ref={passWordRef}
                onChange={(e) => setPassWord(e.target.value)}
                value={passWord}
                required
            />
            <br></br><br></br>
            <button onClick={f => f}>로그인</button>
        </form>
        <Link to={"/agreement/"}><button>회원가입</button></Link>
        <br></br>
        <button>외부 로그인</button>
    </div>
};

export default LoginStage;