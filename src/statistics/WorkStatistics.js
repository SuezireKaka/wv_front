import { useContext, useState } from "react";
import { useParams } from "react-router";
import { InputGroup, Button, Form } from "react-bootstrap";
import AppContext from "context/AppContextProvider";
import axios from "api/axios";

export default function WorkStatistics() {
    const { auth } = useContext(AppContext);
    const [period, setPeriod] = useState(7);
    const [selectedSex, setSelectedSex] = useState("any");
    const [selectedAge, setSelectedAge] = useState("any");

    const param = useParams();

    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const POINT_STYLE = {backgroundColor : "#55aaff"}

    const uri = `/elastic/anonymous/listLatestReadOf/${param.seriesId}/${period}/sex_${selectedSex}-age_${selectedAge}`

    async function query(e) {
        try {
            const response = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });
            console.log(response);
        } catch (err) {
            setError("Registration Failed");
        }
    };

    return <>
        <br/>
        <form>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2" style={POINT_STYLE}>
                    기간
                </InputGroup.Text>
                <Form.Select aria-label="Default select example" onChange={(e) => setPeriod(e.target.value)}>
                    <option value={7}>최근 7일</option>
                    <option value={30}>최근 30일</option>
                </Form.Select>
                <InputGroup.Text id="basic-addon2" style={POINT_STYLE}>
                    성별
                </InputGroup.Text>
                <InputGroup.Text id="basic-addon2">
                    상관없음
                    <input
                        inline
                        defaultChecked
                        label="상관없음"
                        name="userSex"
                        type="radio"
                        onChange={(e) => setSelectedSex(e.target.value)}
                        value="any"
                        id={`inline-radio-2`}
                    />
                </InputGroup.Text>
                <InputGroup.Text id="basic-addon2">
                    남
                    <input
                        inline
                        label="남성"
                        name="userSex"
                        type="radio"
                        value="male"
                        onChange={(e) => setSelectedSex(e.target.value)}
                        id={`inline-radio-1`}
                    />
                </InputGroup.Text>
                <InputGroup.Text id="basic-addon2">
                    여
                    <input
                        inline
                        label="여성"
                        name="userSex"
                        type="radio"
                        onChange={(e) => setSelectedSex(e.target.value)}
                        value="female"
                        id={`inline-radio-2`}
                    />
                </InputGroup.Text>
                <InputGroup.Text id="basic-addon2" style={POINT_STYLE}>
                    연령대
                </InputGroup.Text>
                <Form.Select aria-label="Default select example" onChange={(e) => setSelectedAge(e.target.value)}>
                    <option value={"any"}>상관없음</option>
                    {["10", "20", "30"].map(age => {
                        return <option value={age}>{age}대</option>
                    })}
                </Form.Select>
            </InputGroup>
        </form>
        <br />
        <Button variant="outline-primary" onClick={query}>
            요청하기
        </Button>
        <br />
        <p>period : {period}, sex : {selectedSex}, age : {selectedAge}</p>
        <br />
        <p>여기가 꺾은선 그래프 생길 곳</p>
    </>
}

