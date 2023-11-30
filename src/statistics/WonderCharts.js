import axios from "api/axios";
import AppContext from "context/AppContextProvider";
import { useContext, useEffect, useMemo, useState } from "react";
import { Chart } from "react-google-charts";
import clock from "toolbox/Clock";
import MinMaxInput, { minmax } from "toolbox/MinMaxInput";

export function WonderLineChart({
    data,
    type, period,
    nowEpi, totalEpi,
    width, height,
    selectedAge, selectedSex, calcColor = f => f
}) {
    return <Chart width={width} height={height}
        chartType="LineChart"
        data={data}
        options={{
            title: type === "Summary"
                ? `최근 ${period}일 동안 `
                + `${selectedAge === "any" ? "" : selectedAge + "대 "}`
                + `${selectedSex === "any" ? "" : selectedSex === "male" ? "남성 " : "여성 "}`
                + `독자들의 조회 수`
                : `${nowEpi}/${totalEpi}화 조회 수`
            ,
            pointSize: 5,
            trendlines: {
                0: {
                    pointSize: 0,
                },
                1: {
                    pointSize: 0,
                }
            },
            colors: type === "Summary" ? [calcColor("Posts"), calcColor("Series")] : [calcColor("Series")]
        }}
    />
}

export function WonderAreaChart({
    data,
    type,
    startTime, endTime,
    width, height
}) {
    return <Chart width={width} height={height}
        chartType="AreaChart"
        data={data}
        options={{
            title: `${startTime}에서 ${endTime}까지의 ${type} 통계`,
            isStacked: true,
            colors: type === "account" ? ["#c592c2", "#f2e24f"] : ["#804040", "#36c95b"]
        }}
    />
}

export function WonderPeriodAreaCharter({elasticIndex}) {
    const {auth} = useContext(AppContext)

    const TODAY = clock(new Date());
    const SIJAK = "2023-10-01";

    const DASHBOARD_ARRAY = elasticIndex === "account"
    ? ["날짜", "원더 유저 수", "카카오 유저 수"]
    : ["날짜", "포스트 수", "시리즈 수"];

    const [startDate, setStartDate] = useState(SIJAK);
    const [endDate, setEndDate] = useState(TODAY);
    const [realStartDate, setRealStartDate] = useState(SIJAK);
    const [realEndDate, setRealEndDate] = useState(TODAY);

    const [data, setData] = useState([DASHBOARD_ARRAY, [new Date(), 0, 0]]);
    const [error, setError] = useState();

    const DASHBOARD_URL = `/elastic/getDashBoard/wondervatory_${elasticIndex}/${startDate}/${endDate}`

    function onBlur(e, min, max, callback = f => f) {
        callback(minmax(e.target.value, min, max))
    }

    async function query() {
        try {
            const response = await axios.get(DASHBOARD_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });
            let downBuckets = JSON.parse(response.data.downData).aggregations.byDay.buckets
            let downData = downBuckets.map(bucket => [new Date(bucket.key_as_string), bucket.cumulative_count.value])
            let upBuckets = JSON.parse(response.data.upData).aggregations.byDay.buckets
            let upData = upBuckets.map(bucket => [new Date(bucket.key_as_string), bucket.cumulative_count.value])

            let totalData = downData.map((data, index) => [data[0], downData[index][1], upData[index][1]])

            console.log("이제 이거 그리는 거지?", totalData)

            setData([DASHBOARD_ARRAY, ...totalData])

        } catch (err) {
            setError("Registration Failed");
        }
    };

    // 무조건 한 번 불러라
    useEffect(() => {
        query()
    }, [])

    // 조건이 바뀌어도 불러라
    useMemo(() => {
        query()
    }, [realStartDate, realEndDate])

    return <>


        <MinMaxInput type="date"
            min={SIJAK} max={endDate}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onBlur={(e) => onBlur(e, SIJAK, endDate, setRealStartDate)}
        />
        {"~"}
        <MinMaxInput type="date"
            min={startDate} max={TODAY}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onBlur={(e) => onBlur(e, startDate, TODAY, setRealEndDate)}
        />
        <br />
        <WonderAreaChart
            data={data} type={elasticIndex}
            width={800} height={700}
            startTime={startDate}
            endTime={endDate}
        />
    </>
}