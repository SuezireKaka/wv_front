
import { useRef, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";
import DaumTest from "daumpost/DaumTest";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Register = () => {
	
	const { codeList } = useContext(AppContext);
	console.log(codeList)
	const [name, setName] = useState('');
	const [nameBlur, isNameBlur] = useState(false);
	const [loginId, setLoginId] = useState('');
	const [idChecked, setIdChecked] = useState(false);
    const [uniqueId, setUniqueId] = useState(false);

	const [nick, setNick] = useState('');
	const [nickChecked, setNickChecked] = useState(false);
    const [uniqueNick, setUniqueNick] = useState(false);

	const [passWord, setPassWord] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [birthDateBlur, isBirthDateBlur] = useState(false);
	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState();

	const [sex, setSex] = useState("남성");

	const [listCP, setListCP] = useState(new Map());
	const [fullAddress,setFullAddress] = useState("");
	const [address, setAddress] = useState("");
    const [addText, setAddText] = useState("");
	console.log(listCP);
	console.log();
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		setValidMatch(passWord ? passWord === matchPwd : false);
	}, [passWord, matchPwd])

	useEffect(() => {
		setErrMsg('');
	}, [name, passWord, matchPwd])

	const checkCPValidity = (e, cpType, inValue) => {
		e.preventDefault();
		if (cpType.validationRe && !(new RegExp(cpType.validationRe).test(inValue))) {
			return;
		}

		listCP.set(cpType, cpType=="home address"?address+" "+inValue:inValue);
		setListCP(listCP);
	};

	const checkSex = (e) => {
		console.log("checkSex");
		console.log(e.target.value);
		setSex(e.target.value);
	};

	const onBlur = (e)=>{
		e.preventDefault();
		isNameBlur(true);
		console.log(birthDate);
		if (!birthDate&&birthDate===""){isBirthDateBlur(false);}
		else{isBirthDateBlur(true);}
	}
	const onBlurLoginId = async (e) => {
		e.preventDefault();
		console.log("onBlurNick");
		
		try {
			const response = await axios.get(`/party/anonymous/checkLoginId?loginId=${e.target.value}`);
			console.log(response?.data);
			setIdChecked(true);
			setUniqueId(response?.data);
		} catch (err) {
			setErrMsg('에러')
		}
	};

	const onBlurNick = async (e) => {
		e.preventDefault();
		console.log("onBlurNick");
		
		try {
			const response = await axios.get(`/party/anonymous/checkNick?nick=${e.target.value}`);
			console.log(response?.data);
			setNickChecked(true);
			setUniqueNick(response?.data);
		} catch (err) {
			setErrMsg('에러')
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validMatch)
			return;

		let list = [];
		for (let [key, value] of listCP) {
			list.push({ cpType: key, cpVal: value });
		}

		const bodyData = {
			organization: { id: "0000" },
			name: name,
			nick: nick,
			loginId: loginId,
			passWord: passWord,
			sex: sex,
			birthDate: birthDate,
			listContactPoint: list
		};
		console.log(JSON.stringify(bodyData))

		try {
			const response = await axios.post("/party/anonymous/createMember",
				JSON.stringify(bodyData),
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);
			console.log(response?.data);
			console.log(JSON.stringify(response))
			setSuccess(true);
			navigate(`/log-in`)
			//clear state and controlled inputs
			//need value attrib on inputs for this
		} catch (err) {
			setErrMsg('Registration Failed')
		}
	}

	return (<>
	<form>
	<InputGroup className="mb-3">
	<InputGroup.Text id="basic-addon0">회원가입</InputGroup.Text></InputGroup>
		<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon1">이름</InputGroup.Text>
		<Form.Control type="text"
			id="name"
			onChange={(e) => setName(e.target.value)}
			required
			onBlur={onBlur}
				/></InputGroup>
		<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon2">아이디</InputGroup.Text>
		<Form.Control type="text"
					id="loginId"
					onChange={(e) => setLoginId(e.target.value)}
					required
					onBlur={onBlurLoginId}
				/> </InputGroup>
			<p>
				{idChecked
				? uniqueId
				? "사용 가능한 ID입니다"
				: "이미 사용중인 ID입니다"
				: ""}
			</p>
		<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon2">패스워드</InputGroup.Text>
		<Form.Control input type="password"
					id="passWord"
					onChange={(e) => setPassWord(e.target.value)}
					value={passWord}
					required
				/> </InputGroup>
		<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon2">암호확인</InputGroup.Text>
		<Form.Control type="password"
					id="userMatchPwd"
					placeholder="패스워드를 다시입력하세요"
					onChange={(e) => setMatchPwd(e.target.value)}
					value={matchPwd}
					required
				/></InputGroup>
		<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon2">닉네임</InputGroup.Text>
		<Form.Control type="text"
			id="nick"
			placeholder="닉네임을 정해주세요"
			onChange={(e) => setNick(e.target.value)}
			required
			onBlur={onBlurNick}
				/></InputGroup>
			<p>
				{nickChecked
				? uniqueNick
				? "사용 가능한 닉네임입니다"
				: "이미 사용중인 닉네임입니다"
				: ""}
			</p>
		<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon2">생년월일</InputGroup.Text>
		<input type="date"
					id="birthDate"
					name="birthDate"
					onChange={(e) => setBirthDate(e.target.value)}
					min="1920-01-01"
					max="2023-12-31"
					aria-required="true"
					value={birthDate}
					onBlur={onBlur}
					/></InputGroup>

		<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon2">성별</InputGroup.Text>
		<InputGroup.Text id="basic-addon2">남

		<input inline
						defaultChecked
						label="남성"
						name="userSex"
						type="radio"
						value="남성"
						onChange={checkSex}
						id={`inline-radio-1`}
					/></InputGroup.Text>
		<InputGroup.Text id="basic-addon2">여

		<input inline
						label="여성"
						name="userSex"
						type="radio"
						onChange={checkSex}
						value="여성"
						id={`inline-radio-2`}
					/></InputGroup.Text>
		</InputGroup>
		<br/>
		
		{codeList?.map((cpType) => (<>
			<InputGroup className="mb-3">
		<InputGroup.Text id="basic-addon2">{cpType.codeVal}</InputGroup.Text>
					
					{cpType.codeVal==="home address"?<><DaumTest setAddress={setAddress}/><div style={{width:"100%"}}>
						
					<Form.Control  type='text' value={address+addText} disabled />
					<Form.Control  type='text' id={cpType.codeVal}
		onChange={(e) => checkCPValidity(e, cpType.codeVal, e.target.value)} placeholder="상세주소입력" />
    </div></>:
					<Form.Control 
					type="text"
					id={cpType.codeVal}
					onChange={(e) => checkCPValidity(e, cpType.codeVal, e.target.value)}
					/>}<br/>
		</InputGroup></>))}
					
			{console.log(listCP)}
	</form>
	<Link to='/log-in'>
		<br/>
		<button variant="primary" onClick={handleSubmit} disabled={!(validMatch&&nickChecked&&uniqueNick&&idChecked&&uniqueId&&isNameBlur&&isBirthDateBlur)}>
			Sign Up
		</button>
	</Link>

	</>
	)
}

export default Register;
