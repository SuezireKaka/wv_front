import { Chart } from "react-google-charts";

export function WonderLineChart({data, period, selectedAge, selectedSex, calcColor = f => f}) {
    return <Chart width={800} height={700}
        chartType="LineChart"
        data={data}
        options={{
            title: `최근 ${period}일 동안 `
                + `${selectedAge === "any" ? "" : selectedAge + "대 "}`
                + `${selectedSex === "any" ? "" : selectedSex === "male" ? "남성 " : "여성 "}`
                + `독자들의 조회 수`
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
            colors: [calcColor("Posts"), calcColor("Series")]
        }}
    />
}