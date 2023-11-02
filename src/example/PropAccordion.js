import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function PropAccordion({ objList }) {
    const [nowObjectList, setNowObjectList] =  useState(objList)

    console.log("너 나와봐!", nowObjectList)

    return <div style={{ width: "100%" }}>
        <Accordion alwaysOpen flush>
            {nowObjectList.map((obj, index) => {
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>{obj?.name + "(" + obj?.id + ")"}</Accordion.Header>
                    <Accordion.Body>랄랄라</Accordion.Body>
                </Accordion.Item>
            })}
        </Accordion>
    </div>
}