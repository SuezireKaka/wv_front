
import { useRef, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";

const Register = () => {

	const { codeList } = useContext(AppContext);
	console.log(codeList)
	const [name, setName] = useState('');
	const [loginId, setLoginId] = useState('');
	const [idChecked, setIdChecked] = useState(false);
    const [uniqueId, setUniqueId] = useState(false);

	const [nick, setNick] = useState('');
	const [nickChecked, setNickChecked] = useState(false);
    const [uniqueNick, setUniqueNick] = useState(false);

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
				/>
			<p>
				{idChecked
				? uniqueId
				? "사용 가능한 ID입니다"
				: "이미 사용중인 ID입니다"
				: ""}
			</p>
		<br/>
		패스워드:<input type="password"
					id="userPwd"
					onChange={(e) => setPassWord(e.target.value)}
					value={passWord}
					required
				/>
				<br/>
		암호확인:<input type="password"
					id="userMatchPwd"
					placeholder="패스워드를 다시입력하세요"
					onChange={(e) => setMatchPwd(e.target.value)}
					value={matchPwd}
					required
				/><br/>
		닉네임:<input type="text"
			id="username"
			placeholder="닉네임을 정해주세요"
			onChange={(e) => setNick(e.target.value)}
			required
			onBlur={onBlurNick}
				/>
			<p>
				{nickChecked
				? uniqueNick
				? "사용 가능한 닉네임입니다"
				: "이미 사용중인 닉네임입니다"
				: ""}
			</p>
		<br/>
		생년월일:<input type="date"
					id="birthDate"
					name="birthDate"
					onChange={(e) => setBirthDate(e.target.value)}
					min="1900-01-01"
					value={birthDate}
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

		{codeList?.map((cpType) => (<>
					{cpType.codeVal}:
					<input
						type="text"
						id={cpType.codeVal}
		onChange={(e) => checkCPValidity(cpType.codeVal, e.target.value)}
					/><br></br>
		</>))}

	</form>
		<button variant="primary" onClick={handleSubmit} disabled={!validMatch}>{/*disabled={!validMatch}*/}
			Sign Up
		</button>


	</>
	)
}

export default Register;
