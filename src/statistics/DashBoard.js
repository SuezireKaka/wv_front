import { Row, Col } from "react-bootstrap";
import { WonderPeriodAreaCharter } from "./WonderCharts";

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