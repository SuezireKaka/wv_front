import { Chart } from "react-google-charts";
import MinMaxInput from "toolbox/MinMaxInput";

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
            colors: type === "User" ? ["#c592c2", "#f2e24f"] : ["#804040", "#36c95b"]
        }}
    />
}

export function WonderPeriodAreaCharter({
    data, type,
    min, max,
    startValue, endValue,
    onStartChange = f => f,
    onEndChange = f => f,
    onBlur = f => f }) {
    return <>
        <MinMaxInput type="date"
            min={min} max={endValue}
            value={startValue}
            onChange={(e) => onStartChange(e.target.value)}
            onBlur={(e) => onBlur(e, min, endValue, onStartChange)}
        />
        {"~"}
        <MinMaxInput type="date"
            min={startValue} max={max}
            value={endValue}
            onChange={(e) => onEndChange(e.target.value)}
            onBlur={(e) => onBlur(e, startValue, max, onEndChange)}
        />
        <br />
        <WonderAreaChart
            data={data} type={type}
            width={800} height={700}
            startTime={startValue}
            endTime={endValue}
        />
    </>
}