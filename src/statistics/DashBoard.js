import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { WonderAreaChart, WonderPeriodAreaCharter } from "./WonderCharts";
import clock from "toolbox/Clock";
import MinMaxInput, { minmax } from "toolbox/MinMaxInput";

export default function DashBoard() {

    return <>
        <br /><br />
        <Row><Col>
            <WonderPeriodAreaCharter elasticIndex="account" />
        </Col><Col>
            <WonderPeriodAreaCharter elasticIndex="work" />
        </Col></Row>
    </>
}