import { useRef, useState, useEffect, useContext } from 'react';
import AppContext from 'context/AppContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from 'react-bootstrap';


const LOGIN_URL = 'http://localhost:8080/party/anonymous/sign-in';

const LoginStage = () => {
    const { setAuth } = useContext(AppContext);
    const loginIdRef = useRef();
    const passWordRef = useRef();

    const [loginId, setLoginId] = useState("");
    const [passWord, setPassWord] = useState("");
    const [signInResult, setSignInResult] = useState({});

    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formCenter = {
        display: "inline-block",
        align: "center",
        width:"50%"
    }
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
            if (data.code === 0) {
                setSignInResult(data);
                console.log(data);
                const accessToken = data.token;
                const userId = data.userId;
                const roles = data.roles;
                const nick = data.userNick;
                setAuth({ roles, nick, accessToken, loginId, userId });
                window.sessionStorage.setItem("nowUser", JSON.stringify({ nick, roles, accessToken, loginId, userId }));
                navigate("/")
            }
            else {
                alert("아이디 또는 패스워드가 바르지 않습니다!");
                passWordRef.current.focus();
            };
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
            
            <form style={formCenter}>
                <br/>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">아이디</InputGroup.Text>
                <Form.Control type="text"
                id="loginId"
                ref={loginIdRef}
                autoComplete="off"
                onChange={(e) => setLoginId(e.target.value)}
                value={loginId}
                required
            /></InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">패스워드</InputGroup.Text>
                <Form.Control  type="password"
                id="passWord"
                ref={passWordRef}
                onChange={(e) => setPassWord(e.target.value)}
                value={passWord}
                required
            /></InputGroup>

        </form>
            <Button onClick={signIn} variant="success">로그인</Button><br/>
        <Link to={"/agreement/"}><Button variant="info">회원가입</Button></Link>
        <br/>
        
        <Button variant="outline-warning">외부로그인</Button>
    </div>
};

export default LoginStage;