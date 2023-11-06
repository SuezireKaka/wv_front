import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';
import PureDrag from './PureDrag';

export default function PropAccordion({nowObjectList, onUpdate = f => f}) {
    console.log("너 나와봐!", nowObjectList)

    return <div style={{ width: "100%" }}>
        { console.log("너 나와봐!", nowObjectList)}
        <div style={{ display: 'block????', backgroundColor: nowObjectList && nowObjectList.length > 0 ? "blue" : "white", padding: 1 }}> 
        <Accordion alwaysOpen flush>
            {nowObjectList?.map((obj, index) => {
                return <Accordion.Item key={index} eventKey={index}>
                    {console.log(obj?.name)}
                    <Accordion.Header>{obj?.name + "(" + obj?.id + ")"}</Accordion.Header>
                    <Accordion.Body  style={{ backgroundColor:"lightblue"}}>
                        <PureDrag
                            propList={obj?.customPropertiesList.map(
                                prop => {
                                    console.log("이걸 줄 예정이래요", {...prop, isSafe : true, isEdited : false})
                                    return {...prop, isSafe : true, isEdited : false}
                                }
                            )}
                            onChange={(newList) => onUpdate(newList, index)}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            })}
        </Accordion>
        </div>
    </div>
}