
import { useRef, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";

const Register = () => {

	const { codeList } = useContext(AppContext);
	console.log(codeList)
	const [name, setName] = useState('');
	const [nick, setNick] = useState('');
	const [loginId, setLoginId] = useState('');

	const [passWord, setPassWord] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState();

	const [sex, setSex] = useState();

	const [listCP, setListCP] = useState(new Map());

	console.log(listCP);
	console.log();
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setValidMatch(passWord ? passWord === matchPwd : false);
	}, [passWord, matchPwd])

	useEffect(() => {
		setErrMsg('');
	}, [name, passWord, matchPwd])

	const checkCPValidity = (cpType, inValue) => {
		if (cpType.validationRe && !(new RegExp(cpType.validationRe).test(inValue))) {
			return;
		}
		//복제하고
		listCP.set(cpType, inValue);
		setListCP(listCP);
	};
	const checkDate = (e) => {
		console.log("checkDate");
		console.log(e.target.value);
		console.log(typeof e.target.value);
	};


	const checkSex = (e) => {
		console.log("checkSex");
		console.log(e.target.value);
		setSex(e.target.value);
	};

	const onBlurLoginId = async (e) => {
		e.preventDefault();
		console.log("onBlurLoginId");
		try {
			const response = await axios.get(`/party/anonymous/checkLoginId?loginId=${e.target.value}`);
			console.log(response?.data);
			console.log(JSON.stringify(response))
		} catch (err) {
			setErrMsg('에러')
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validMatch)
			return;

		let list = [];
		list = listCP.entries().next((key, value)=>({cpType:key, cpVal:value})).collect();
		for (let [key, value] of listCP) {
			list.push({ cpType: key, cpVal: value });
		}

		const bodyData = {
			organization: { id: "0000" },
			name: name,
			nick: nick,
			loginId: loginId,
			pwd: passWord,
			sex: sex,
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
			//clear state and controlled inputs
			//need value attrib on inputs for this
		} catch (err) {
			setErrMsg('Registration Failed')
		}
	}

	return (<>
	<form>
		<p>회원가입</p>
		이름:<input type="text"
			id="name"
			onChange={(e) => setName(e.target.value)}
			required
				/><br/>
		아이디:<input type="text"
					id="userNick"
					onChange={(e) => setLoginId(e.target.value)}
					required
					onBlur={onBlurLoginId}
				/><br/>
		패스워드:<input type="password"
					id="userPwd"
					onChange={(e) => setPassWord(e.target.value)}
					value={passWord}
					required
				/><br/>
		패스워드확인:<input type="password"
					id="userPwd"
					onChange={(e) => setPassWord(e.target.value)}
					placeholder="비밀번호확인 필요"
					value={matchPwd}
					required
				/><br/>
					닉네임:<input type="text"
						id="username"
						placeholder="닉네임을 정해주세요"
						onChange={(e) => setNick(e.target.value)}
						required
							/><br/>
		생년월일:<input type="date"
					id="birthDate"
					name="birthDate"
					onChange={(e) => setBirthDate(e.target.value)}
					min="1900-01-01"
					value={birthDate}
					/><br/>
		암호확인:<input type="password"
					id="userMatchPwd"
					placeholder="패스워드를 다시입력하세요"
					onChange={(e) => setMatchPwd(e.target.value)}
					value={matchPwd}
					required
				/><br/>
		성별:남<input inline
						defaultChecked
						label="남성"
						name="userSex"
						type="radio"
						value={true}
						onChange={checkSex}
						id={`inline-radio-1`}
					/>여

		<input inline
						label="여성"
						name="userSex"
						type="radio"
						onChange={checkSex}
						value={false}
						id={`inline-radio-2`}
					/><br/>

		{/*codeList.map((cpType) => (<>
					<form htmlFor={cpType.codeVal}>{cpType.codeVal}:</form>
					<input
						type="text"
						id={cpType.codeVal}
		onChange={(e) => checkCPValidity(cpType.codeVal, e.target.value)}
					/>
		</>))*/}

	</form>
		<button variant="primary" onClick={handleSubmit}>{/*disabled={!validMatch}*/}
			Sign Up
		</button>


	</>
	)
}

export default Register;
