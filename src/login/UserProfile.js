import AppContext from "context/AppContextProvider";
import { useContext } from 'react';
import axios from "api/axios";
import { Fetch } from "toolbox/Fetch";
import { Form } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DaumTest from "daumpost/DaumTest";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function UserProfile() {
    const { auth } = useContext(AppContext);
	const location = useLocation();
    const state = location.state;
    const response = location.state.response;
    const owner = location.state.owner;
    console.log(state)
    console.log(response)
    console.log(owner)
    const [nick, setNick] = useState(state?.nick);
    const [name, setName] = useState(response.name);
    const [birthDate, setBirthDate] = useState(response.birthDate.substring(0, 10));
    const [sex, setSex] = useState(response.sex);

    const handleSubmit =() =>{}
    const handleDelete =() =>{}
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
    const [listCP, setListCP] = useState(new Map());
    const [fullAddress, setFullAddress] = useState("");
    const [address, setAddress] = useState("");
    const [addText, setAddText] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const checkSex = (e) => {
        console.log("checkSex");
        console.log(e.target.value);
        setSex(e.target.value);
      };
    
  const checkCPValidity = (e, cpType, inValue) => {
    e.preventDefault();
    if (cpType.validationRe && !new RegExp(cpType.validationRe).test(inValue)) {
      return;
    }
    listCP.set(
      cpType,
      cpType == "home address" ? address + " " + inValue : inValue
    );
    setListCP(listCP);
  };

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
            value={name}

          /></InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">닉네임</InputGroup.Text>
          <Form.Control
            type="text"
            id="nick"
            placeholder="닉네임을 정해주세요"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            required
          /></InputGroup>

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
        <p>
          {nickChecked
            ? uniqueNick
              ? "사용 가능한 닉네임입니다"
              : "이미 사용중인 닉네임입니다"
            : ""}
        </p>
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
        </InputGroup>

        <InputGroup className="mb-3" >
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

        {response.contactPointList?.map((cp) => (
            
          <>    {console.log(codeList)}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">
              {cp.cpType}
            </InputGroup.Text>

            {cp.cpType === "home address" ? (
              <>
                <DaumTest setAddress={setAddress} />
                <div style={{ width: "100%" }}>
                  <Form.Control
                    type="text"
                    value={cp.cpVal}
                    disabled
                  />
                  <Form.Control
                    type="text"
                    id={cp.cpType}
                    
                    placeholder="상세주소입력"
                  />
                </div>
              </>
            ) : (
              <Form.Control
                type="text"
                id={cp.cpType}
                value={cp.cpVal}
                
              />
            )}
            <br />
          </InputGroup>
          </>

        ))}

        {console.log(listCP)}
      </form>

		<Button variant="outline-primary" onClick={handleSubmit} disabled={!hasAllContents} >
			반영
		</Button>
		<Button variant="outline-dark" onClick={handleDelete}>
			탈퇴
		</Button>
	</Form >)
    };


