import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';

export default function PropAccordion(props) {
    console.log(props)
    const [nowObjectList, setNowObjectList] =  React.useState(props.objList);

    console.log("너 나와봐!", nowObjectList)

    return <div style={{ width: "100%" }}>
        { console.log("너 나와봐!", nowObjectList)}
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