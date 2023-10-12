
import { useRef, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";

const Register = () => {

	const { codeList } = useContext(AppContext);

	const [name, setName] = useState('');
	const [nick, setNick] = useState('');
	const [loginId, setLoginId] = useState('');

	const [passWord, setPassWord] = useState('');
	
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

	const checkSex = (e) => {
		console.log("checkSex");
		console.log(e.target.value);
		setSex(e.target.value);
	};

	const onBlurNick = async (e) => {
		e.preventDefault();
		console.log("onBlurNick");
		try {
			const response = await axios.get(`/party/anonymous/checkNick?nick=${e.target.value}`);
			console.log(response?.data);
			console.log(JSON.stringify(response))
		} catch (err) {
			setErrMsg('jkhgiujhg')
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
					onBlur={onBlurNick}
				/><br/>
		닉네임:<input type="text"
			id="username"
			placeholder="닉네임을 정해주세요"
			onChange={(e) => setNick(e.target.value)}
			required
				/><br/>
		패스워드:<input type="password"
					id="userPwd"
					onChange={(e) => setPassWord(e.target.value)}
					value={passWord}
					required
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
					/>
		{/*codeList.map((cpType) => (<>
					<form htmlFor={cpType.codeVal}>{cpType.codeVal}:</form>
					<input
						type="text"
						id={cpType.codeVal}
						onChange={(e) => checkCPValidity(cpType.codeVal, e.target.value)}
					/>
		</>))*/}

	</form>
		<button variant="primary" onClick={handleSubmit}>{/* disabled={!validMatch} */}
			Sign Up
		</button>



		{/* success ? (
		<section>
			<h1>Success!</h1>
			<p>
				<a href="#">Sign In</a>
			</p>
		</section>
	) : ( <Form.Group className="mb-3" >
				<Form.Label htmlFor="username">이름:</Form.Label>
				<Form.Control
					type="text"
					id="username"
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group className="mb-3" >
				<Form.Label htmlFor="userNick">사용자 닉:</Form.Label>
				<Form.Control
					type="text"
					id="userNick"
					onChange={(e) => setUserNick(e.target.value)}
					required
					onBlur={onBlurNick}
				/>
			</Form.Group>

			<Form.Group className="mb-3" >
				<Form.Label htmlFor="userPwd">암호:</Form.Label>
				<Form.Control
					type="password"
					id="userPwd"
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
				/>
				<Form.Label htmlFor="userMatchPwd">암호확인:</Form.Label>
				<Form.Control
					type="password"
					id="userMatchPwd"
					onChange={(e) => setMatchPwd(e.target.value)}
					value={matchPwd}
					required
				/>
			</Form.Group>
			<Form.Group className="mb-3" >
				<Form.Label htmlFor="userSex">성별:</Form.Label>
				<div key={`inline-radio`} className="mb-3">
					<Form.Check
						inline
						defaultChecked
						label="남성"
						name="userSex"
						type="radio"
						value={true}
						onChange={checkSex}
						id={`inline-radio-1`}
					/>
					<Form.Check
						inline
						label="여성"
						name="userSex"
						type="radio"
						onChange={checkSex}
						value={false}
						id={`inline-radio-2`}
					/>
				</div>
			</Form.Group>
			<Form.Group className="mb-3" >
				{codeList.map((cpType) => (<>
					<Form.Label htmlFor={cpType.codeVal}>{cpType.codeVal}:</Form.Label>
					<Form.Control
						type="text"
						id={cpType.codeVal}
						onChange={(e) => checkCPValidity(cpType.codeVal, e.target.value)}
					/>
				</>))}
			</Form.Group>*/}

	</>
	)
}

export default Register;
