import AppContext from "context/AppContextProvider";
import { useContext } from 'react';
import axios from "api/axios";
import { Fetch } from "toolbox/Fetch";
import { Form } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DaumPost from "daumpost/DaumPost";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import UserSeries from "./UserSeries";

export default function UserProfile() {
  const { auth, setAuth } = useContext(AppContext);
	  const location = useLocation();
    const state = location.state;
    const response = location.state?.response;
    const owner = location.state?.owner;
    console.log(auth)
    console.log(state)
    console.log(response)
    console.log(owner)
    const [nick, setNick] = useState(state?.nick);
    const [name, setName] = useState(response?.name);
    const [signInResult, setSignInResult] = useState({});
    const [birthDate, setBirthDate] = useState(response?.birthDate.substring(0, 10));
    const [sex, setSex] = useState(response.sex);
    const hasAllContents =() =>{}
    const { codeList } = useContext(AppContext);

    const [nameBlur, isNameBlur] = useState(false);
    const [loginId, setLoginId] = useState(state.loginId);
    const [idChecked, setIdChecked] = useState(false);
    const [uniqueId, setUniqueId] = useState(false);

    const [nickChecked, setNickChecked] = useState(false);
    const [uniqueNick, setUniqueNick] = useState(false);
    const [passWord, setPassWord] = useState("");
    const [birthDateBlur, isBirthDateBlur] = useState(false);
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState();
    const [listCP, setListCP] = useState(new Map(response.contactPointList.map(cp => [cp.cpType, cp.cpVal])));
    const [fullAddress, setFullAddress] = useState("");
    const [address, setAddress] = useState(state.contactPointList?.filter(cp => cp.cpType === "home address")[0]);
    const [addText, setAddText] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      setValidMatch(passWord ? passWord === matchPwd : false);
    }, [passWord, matchPwd]);
  
    useEffect(() => {
      setErrMsg("");
    }, [name, passWord, matchPwd]);
  


    const onBlur = (e) => {
      e.preventDefault();
      isNameBlur(true);
      console.log(birthDate);
      if (!birthDate && birthDate === "") {
        isBirthDateBlur(false);
      } else {
        isBirthDateBlur(true);
      }
    };

    const onBlurNick = async (e) => {
      e.preventDefault();
      console.log("onBlurNick");
      
      try {
        const response = await axios.get(
          `/party/anonymous/checkNick?nick=${e.target.value}`
        );
        if(auth.nick===e.target.value){
        setNickChecked(true);
        setUniqueNick(true);
        }else if(!e.target.value && e.target.value === ""){
          setNickChecked(false);
          setUniqueNick(false);
        }else{
        setNickChecked(true);
        setUniqueNick(response?.data);}
      } catch (err) {
        setErrMsg("에러");
      }
    };

    const checkSex = (e) => {
        console.log("checkSex");
        console.log(e.target.value);
        setSex(e.target.value);
      };
    
      const checkCPValidity = (e, code, inValue) => {
        console.log(code);
        console.log(inValue);
        e.preventDefault();
        if (code.validationRe && !new RegExp(code.validationRe).test(inValue)) {
          return;
        }
    
        listCP.set(
          code.codeVal,
          code.codeVal == "home address" ? address + " " + inValue : inValue
        );
        console.log(listCP);
        setListCP(listCP);
        console.log(listCP);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validMatch) return;

    let list = [];
    for (let [key, value] of listCP) {
      list.push({ cpType: key, cpVal: value });
    }
    
    const bodyData = {
      organization: { id: "0000" },
      accountId: state.id,
      partyId: response.id,
      name: name,
      nick: nick,
      loginId: loginId,
      passWord: passWord,
      sex: sex,
      birthDate: birthDate,
      listContactPoint: list,
    };
    console.log(JSON.stringify(bodyData));

    try {
      const response = await axios.post(
        "/party/updateMember",
        JSON.stringify(bodyData),
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `Bearer ${auth.accessToken}`
          },
          
        }
      );
      console.log(response?.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      navigate(`/`);
      //clear state and controlled inputs
      //need value attrib on inputs for this
    } catch (err) {
      setErrMsg("Registration Failed");
    }
  };
  	
	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const data = await axios.get(`/party/deleteMember/${auth.nick}`,
				{headers: {
					'Content-Type': 'application/json',
          "x-auth-token": `Bearer ${auth.accessToken}`
				}});

		} catch (err) {
			console.log('Delete Failed', err);
		} finally {
			// navigate state 전달
			console.log('Delete state', state);
      setAuth({nick : "", roles : []});
      window.sessionStorage.setItem("nowUser", JSON.stringify({nick : "", roles : []}));
      setSignInResult({});
			navigate(-1, {state:state});
		}
	}




    console.log("지금 우리가 뭘 던지려고 하는 거야?", listCP);
    return (<Form>
        
		<h4>프로필보기</h4>
		<form>
        <InputGroup className="mb-3" style={{display: "inline-block", align: "center", width:"50%", backgroundColor:""}}>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">이름</InputGroup.Text>
          <Form.Control
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            onBlur={onBlur}
          /></InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">닉네임</InputGroup.Text>
          <Form.Control
            type="text"
            id="nick"
            placeholder="닉네임을 정해주세요"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            onBlur={onBlurNick}
            required
          /></InputGroup>
        <p>{nickChecked
            ? uniqueNick
              ? "사용 가능한 닉네임입니다"
              :"이미 사용중인 닉네임입니다"
            : ""}
        </p>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">아이디</InputGroup.Text>
          <Form.Control
            type="text"
            id="loginId"
            value={loginId}
            disabled
          /></InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">패스워드</InputGroup.Text>
          <Form.Control
            input
            type="password"
            id="passWord"
            onChange={(e) => setPassWord(e.target.value)}
            value={passWord}
            required
          />{" "}
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">암호확인</InputGroup.Text>
          <Form.Control
            type="password"
            id="userMatchPwd"

            placeholder="패스워드를 다시입력하세요"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">생년월일</InputGroup.Text>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
            min="1920-01-01"
            max="2023-12-31"
            aria-required="true"
            value={birthDate}
          />

          <InputGroup.Text id="basic-addon2">성별</InputGroup.Text>
          <InputGroup.Text id="basic-addon2">
            남
            {response.sex==="남성"?            
            <input
              inline
              defaultChecked
              label="남성"
              name="userSex"
              type="radio"
              onChange={checkSex}
              value="남성"
              id={`inline-radio-1`}
            />:<input
            inline
            label="남성"
            name="userSex"
            type="radio"
            onChange={checkSex}
            value="남성"
            id={`inline-radio-1`}
            />}
          </InputGroup.Text>
          <InputGroup.Text id="basic-addon2">
            여
            {response.sex==="여성"?            
            <input
              inline
              defaultChecked
              label="여성"
              name="userSex"
              type="radio"
              onChange={checkSex}
              value="여성"
              id={`inline-radio-1`}
            />:<input
            inline
            label="여성"
            name="userSex"
            type="radio"
            onChange={checkSex}
            value="여성"
            id={`inline-radio-1`}
            />}
          </InputGroup.Text>
        </InputGroup>
        <br />
        {codeList?.map((code) => {
          let rcpVal = Array(...listCP.keys()).includes(code.codeVal) ? listCP.get(code.codeVal) : ""
          return <>{console.log(Array(...listCP.keys()))}{console.log(code)}{console.log(rcpVal)}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">
              {code.codeVal}
            </InputGroup.Text>

            {code.codeVal === "home address" ? (
              <>
                <DaumPost setAddress={setAddress} />
                <div style={{ width: "100%" }}>
                  <Form.Control
                    type="text"
                    defaultValue={rcpVal}
                    value={address}
                    disabled
                  />
                  <Form.Control
                    type="text"
                    id={code.codeType}
                    onChange={(e) =>
                        checkCPValidity(e, code, e.target.value)
                      }
                    placeholder="상세주소입력"
                  />
                </div>
              </>
            ) : (
              <Form.Control
                type="text"
                id={code.codeVal}
                defaultValue={rcpVal}
                onChange={(e) =>
                  checkCPValidity(e, code, e.target.value)
                }
              />
            )}
            <br />
          </InputGroup>
          </>
        })}


       
      </form>

		<Button variant="outline-primary"
          onClick={handleSubmit}
          disabled={
            !(
              validMatch &&
              nickChecked &&
              uniqueNick &&
              isNameBlur &&
              isBirthDateBlur
            )
          } >
			반영
		</Button>
		<Button variant="outline-dark" onClick={handleDelete}>
			탈퇴
		</Button>
    

	</Form >)
};


