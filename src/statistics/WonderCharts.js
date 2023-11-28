import { Chart } from "react-google-charts";

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