import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { WonderAreaChart, WonderPeriodAreaCharter } from "./WonderCharts";
import clock from "toolbox/Clock";
import MinMaxInput, { minmax } from "toolbox/MinMaxInput";

export default function DashBoard() {
    const TODAY = clock(new Date());
    const SIJAK = "2023-10-01";

    const [startUserDate, setStartUserDate] = useState(SIJAK);
    const [endUserDate, setEndUserDate] = useState(TODAY);
    const [startWorkDate, setStartWorkDate] = useState(SIJAK);
    const [endWorkDate, setEndWorkDate] = useState(TODAY);

    const dummy_account = [
        ["날짜", "원더 계정 수", "카카오 계정 수"],
        [new Date("2023-12-01 00:00:00"), 20, 3],
        [new Date("2023-12-02 00:00:00"), 27, 6],
        [new Date("2023-12-03 00:00:00"), 28, 6],
        [new Date("2023-12-04 00:00:00"), 30, 7],
        [new Date("2023-12-05 00:00:00"), 31, 7],
        [new Date("2023-12-06 00:00:00"), 36, 8],
        [new Date("2023-12-07 00:00:00"), 45, 10],
        [new Date("2023-12-08 00:00:00"), 50, 12],
        [new Date("2023-12-09 00:00:00"), 53, 13]
    ]
    const dummy_work = [
        ["날짜", "포스트 수", "시리즈 수"],
        [new Date("2023-12-01 00:00:00"), 12, 5],
        [new Date("2023-12-02 00:00:00"), 20, 8],
        [new Date("2023-12-03 00:00:00"), 23, 10],
        [new Date("2023-12-04 00:00:00"), 27, 11],
        [new Date("2023-12-05 00:00:00"), 28, 12],
        [new Date("2023-12-06 00:00:00"), 30, 12],
        [new Date("2023-12-07 00:00:00"), 35, 14],
        [new Date("2023-12-08 00:00:00"), 40, 18],
        [new Date("2023-12-09 00:00:00"), 42, 19]
    ]

    function onBlur(e, min, max, callback = f => f) {
        callback(minmax(e.target.value, min, max))
    }

    return <>
        <br /><br />
        <Row><Col>
            <WonderPeriodAreaCharter
                data={dummy_account}
                type="User"
                min={SIJAK} max={TODAY}
                startValue={startUserDate}
                endValue={endUserDate}
                onStartChange={setStartUserDate}
                onEndChange={setEndUserDate}
                onBlur={onBlur}
            />
        </Col><Col>
            <WonderPeriodAreaCharter
                data={dummy_work}
                type="Work"
                min={SIJAK} max={TODAY}
                startValue={startWorkDate}
                endValue={endWorkDate}
                onStartChange={setStartWorkDate}
                onEndChange={setEndWorkDate}
                onBlur={onBlur}
            />
        </Col></Row>
    </>
}