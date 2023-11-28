import { useContext, useState } from "react";
import { useParams } from "react-router";
import { InputGroup, Button, Form } from "react-bootstrap";
import AppContext from "context/AppContextProvider";
import axios from "api/axios";
import { FaCircle } from "react-icons/fa";
import { WonderLineChart } from "./WonderCharts";

export default function WorkStatistics() {
    const { auth } = useContext(AppContext);
    const [period, setPeriod] = useState(7);
    const [selectedSex, setSelectedSex] = useState("any");
    const [selectedAge, setSelectedAge] = useState("any");

    const COLUMN_ARRAY = ["날짜", "시리즈 클릭수", "포스트 총 조회수"];

    const param = useParams();

    const [hasRequested, setHasRequested] = useState(false);

    const [data, setData] = useState([COLUMN_ARRAY, [new Date(), 0, 0]]);
    const [error, setError] = useState("");

    const [epiNum, setEpiNum] = useState(1);

    const POINT_STYLE = { backgroundColor: "#55aaff" }

    const uri = `/elastic/anonymous/getLatestReadOf/${param.seriesId}/${period}/sex_${selectedSex}-age_${selectedAge}`

    async function query(e) {
        e.preventDefault();
        try {
            const response = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });

            let seriesReadData = JSON.parse(response.data.seriesReadData);
            let allPostsReadData = JSON.parse(response.data.allPostsReadData);

            setData(saltData(seriesReadData, allPostsReadData))
            setHasRequested(true);
        } catch (err) {
            setError("Registration Failed");
        }
    };

    function onChange(e, callback = f => f) {
        callback(e.target.value);
        setHasRequested(false);
    }

    function calcColor(type) {
        return type === "Series"
        ? selectedSex === "male" ? "#335be8" : selectedSex === "female" ? "#ef8fd2" : "#e3ac1c"
        : selectedSex === "male" ? "#192d74" : selectedSex === "female" ? "#774769" : "#715e0e";
    }

    function saltData(rawSeriesData, rawAllPostsData) {
        let table = [COLUMN_ARRAY];

        let seriesBuckets = rawSeriesData.aggregations.byDay.buckets;
        let allPostsBuckets = rawAllPostsData.aggregations.byDay.buckets;

        sync(seriesBuckets, allPostsBuckets)
        
        if (seriesBuckets.length === 0) {
            table.push([new Date().setHours(0, 0, 0, 0), 0, 0])
        }
        seriesBuckets.forEach((readCnt, index) => {
            table.push([
                new Date(readCnt.key_as_string + " 00:00:00"),
                readCnt.doc_count,
                allPostsBuckets[index].doc_count
            ])
        })
        console.log("이걸 구글 차트한테 맡긴다는 거지?", table)

        return table
    }
    
    function sync(oneData, otherData) {
        let oneKeysArr = oneData.map(data => data.key_as_string)
        let otherKeysArr = otherData.map(data => data.key_as_string)

        pushToSync(oneData, otherKeysArr, oneKeysArr)
        pushToSync(otherData, oneKeysArr, otherKeysArr)
    }

    function pushToSync(data, oneKeysArr, otherKeysArr) {
        let newKeysArr = oneKeysArr.filter(key => ! otherKeysArr.includes(key))
        newKeysArr.forEach(key => data.push({key_as_string : key, doc_count : 0}))
    }

    return <>
        <br />
        <form>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2" style={POINT_STYLE}>
                    기간
                </InputGroup.Text>
                <Form.Select aria-label="Default select example" onChange={(e) => { onChange(e, setPeriod) }}>
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
                        onChange={(e) => { onChange(e, setSelectedSex) }}
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
                        onChange={(e) => { onChange(e, setSelectedSex) }}
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
                        onChange={(e) => { onChange(e, setSelectedSex) }}
                        value="female"
                        id={`inline-radio-2`}
                    />
                </InputGroup.Text>
                <InputGroup.Text id="basic-addon2" style={POINT_STYLE}>
                    연령대
                </InputGroup.Text>
                <Form.Select aria-label="Default select example" onChange={(e) => { onChange(e, setSelectedAge) }}>
                    <option value={"any"}>상관없음</option>
                    {["10", "20", "30"].map(age => {
                        return <option value={age}>{age}대</option>
                    })}
                </Form.Select>
            </InputGroup>
        </form>
        <br />
        <FaCircle color={calcColor("Series")} /><FaCircle color={calcColor("Post")} />
        <br />
        <Button variant="outline-primary" onClick={query}>
            요청하기
        </Button>
        <br />
        <p>period : {period}, sex : {selectedSex}, age : {selectedAge}</p>
        <br />
        {hasRequested
            ? <table>
                <tr>
                    <td>
                        <WonderLineChart data={data}
                            period={period}
                            selectedAge={selectedAge}
                            selectedSex={selectedSex}
                            calcColor={calcColor}
                        />
                    </td>
                    <td>
                        <Button></Button>
                        <p>{`현재 ${epiNum}화 선택중......`}</p>
                    </td>
                </tr>
            </table>
            : ""}
    </>
}

