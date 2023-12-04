import { useContext, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { InputGroup, Button, Form, Row, Col } from "react-bootstrap";
import AppContext from "context/AppContextProvider";
import axios from "api/axios";
import { FaCircle } from "react-icons/fa";
import { WonderLineChart } from "./WonderCharts";
import MinMaxInput, { minmax } from "toolbox/MinMaxInput";

export default function WorkStatistics() {
    const { auth } = useContext(AppContext);
    const [period, setPeriod] = useState(7);
    const [selectedSex, setSelectedSex] = useState("any");
    const [selectedAge, setSelectedAge] = useState("any");

    const param = useParams();

    const SUMMARY_COLUMN_ARRAY = ["날짜", "시리즈 클릭수", "포스트 총 조회수"];
    const SUMMARY_INIT_DATA = [SUMMARY_COLUMN_ARRAY, [new Date(), 0, 0]];
    const DETAIL_COLUMN_ARRAY = ["날짜", "포스트 조회수"];
    const DETAIL_INIT_DATA = [DETAIL_COLUMN_ARRAY, [new Date(), 0]];

    const [summaryData, setSummaryData] = useState(SUMMARY_INIT_DATA);
    const [detailData, setDetailData] = useState(DETAIL_INIT_DATA);
    const [error, setError] = useState("");

    const [totalEpiNum, setTotalEpiNum] = useState(1);
    const [nowEpiNum, setNowEpiNum] = useState(1);
    const [selectedEpiNum, setSelectedNowEpiNum] = useState(1);


    const POINT_STYLE = { backgroundColor: "#55aaff" }

    const COUNT_URL = `work/anonymous/countPostsOf/${param.seriesId}`
    const SUMMARY_DATA_URL = `/elastic/getLatestReadOf/${param.seriesId}/${period}/sex_${selectedSex}-age_${selectedAge}`
    function buildDetailUrl(minmax) {
        return `/elastic/getLatestReadByEpinum/${param.seriesId}/${minmax}/${period}/sex_${selectedSex}-age_${selectedAge}`
    }

    async function query() {
        try {
            const response = await axios.get(SUMMARY_DATA_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });

            let seriesReadData = JSON.parse(response.data.seriesReadData);
            let allPostsReadData = JSON.parse(response.data.allPostsReadData);

            setSummaryData([...saltData(SUMMARY_COLUMN_ARRAY, seriesReadData, allPostsReadData)])
        } catch (err) {
            setError("Registration Failed");
        }
    };

    function onChange(e, callback = f => f) {
        callback(e.target.value);
    }

    function onBlur(e, min, max, callback = f => f) {
        callback(e, minmax(e.target.value, min, max))
    }

    function calcColor(type) {
        return type === "Series"
            ? selectedSex === "male" ? "#335be8" : selectedSex === "female" ? "#ef8fd2" : "#e3ac1c"
            : selectedSex === "male" ? "#192d74" : selectedSex === "female" ? "#774769" : "#715e0e";
    }

    async function onDecideEpi(e, minmax) {
        e?.preventDefault()
        setNowEpiNum(minmax)
        setSelectedNowEpiNum(minmax)
        try {
            const response = await axios.get(buildDetailUrl(minmax), {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });

            let postReadData = JSON.parse(response.data.postReadData);
            setDetailData([...saltData(DETAIL_COLUMN_ARRAY, postReadData)]);
        } catch (err) {
            setError("Registration Failed");
        }
    }

    useEffect(() => {
        async function countPostsOf() {
            console.log("이거 돌아가니?")
            try {
                const result = await axios.get(COUNT_URL);
                setTotalEpiNum(result.data);
            } catch (err) {
                setError("Registration Failed");
            }
        };
        setTotalEpiNum(countPostsOf());
    }, [param.seriesId])

    // 무조건 한 번 부르고
    useMemo(() => {
        query()
    }, [])

    // 조건이 바뀌어도 부르고
    useMemo(() => {
        query()
    }, [period, selectedSex, selectedAge])

    // 큰 그림을 불렀으면 디테일한 것도 불러라
    useMemo(() => {
        if (totalEpiNum > 0) {
            onDecideEpi(null, nowEpiNum)
        }
    }, [summaryData])

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
        <Row><Col>

            <WonderLineChart data={summaryData}
                type={"Summary"}
                width={800} height={700}
                period={period}
                selectedAge={selectedAge}
                selectedSex={selectedSex}
                calcColor={calcColor}
            />
        </Col><Col>
                {totalEpiNum > 0
                    ? <>
                        <br /><br />
                        <label>화 수를 입력하세요 : </label>
                        <MinMaxInput type="number"
                            min={0} max={totalEpiNum}
                            value={nowEpiNum}
                            onChange={e => onChange(e, setNowEpiNum)}
                            onBlur={e => onBlur(e, 1, totalEpiNum, onDecideEpi)}
                        />
                        <br />
                        <WonderLineChart data={detailData}
                            type={"Detail"}
                            nowEpi={selectedEpiNum}
                            totalEpi={totalEpiNum}
                            width={800} height={600}
                            selectedSex={selectedSex}
                            calcColor={calcColor}
                        />
                    </>
                    : <p>(아직 등록된 포스트가 없습니다)</p>
                }
            </Col></Row>
    </>
}

export function saltData(columnArray, rawSeriesData, rawAllPostsData) {
    let table;
    let seriesBuckets = rawSeriesData.aggregations.byDay.buckets;


    // rawAllPostsData가 들어오면 큰 틀에서의 조회수
    if (rawAllPostsData) {
        table = [[...columnArray]];
        let allPostsBuckets = rawAllPostsData.aggregations?.byDay?.buckets;
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
    }
    // 안 들어오면 디테일한 조회수
    else {
        table = [[...columnArray]];
        seriesBuckets.forEach(readCnt => {
            table.push([
                new Date(readCnt.key_as_string + " 00:00:00"),
                readCnt.doc_count
            ])
        })
    }

    console.log("이걸 구글 차트한테 맡긴다는 거지?", table)

    return table
}
