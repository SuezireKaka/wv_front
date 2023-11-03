import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';

export default function PropAccordion({nowObjectList, setNowObjectList}) {
    console.log(nowObjectList)


    console.log("너 나와봐!", nowObjectList)

    return <div style={{ width: "100%" }}>
        { console.log("너 나와봐!", nowObjectList)}
        <div style={{ display: 'block????', backgroundColor:"blue", padding: 1 }}> 
        <Accordion alwaysOpen flush>
            {nowObjectList.map((obj, index) => {
                return <Accordion.Item eventKey={index}>
                    {console.log(obj?.name)}
                    <Accordion.Header>{obj?.name + "(" + obj?.id + ")"}</Accordion.Header>
                    <Accordion.Body  style={{ backgroundColor:"lightblue"}}>랄랄라</Accordion.Body>
                </Accordion.Item>
            })}
        </Accordion>
        </div>
    </div>
}