import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Fetch} from 'toolbox/Fetch';
import { displayDate } from "toolbox/DateDisplayer";
import CheckboxGroup from '../toolbox/CheckboxGroup';
import Checkbox from '../toolbox/Checkbox';
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import axios from 'api/axios';
import RadioMember from './RadioMember';
import { Table } from 'react-bootstrap';
export default function MemberList() {
    const { ownerId } = useParams();
    

    console.log(ownerId);
    const listAllMemberUri = `/party/anonymous/listAllAccount/${ownerId}/1`;
    console.log(listAllMemberUri);

    

    return (
        <div>
 
            <Table striped bordered hover>
                <thead>
                    <tr background-color="red">
                        <th>아이디</th>
                        <th>닉</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>성별</th>
                        <th>분류</th>
                    </tr>
                </thead>
                <tbody>
                <Fetch uri={listAllMemberUri} renderSuccess={RenderSuccess} />
                 </tbody>
            </Table>
           
                
        </div>
    );
}


function RenderSuccess(memberList) {
    console.log(memberList);
    console.log(memberList.firstVal);
    return memberList.firstVal?.map(member => (
        <>
            <tr key={member.id}>
                <td><b>{member.loginId}</b></td>
                <td><b>{member.nick}</b></td>
                <td><b>{member.response?.name}</b></td>
                <td>{member.response?.birthDate?.substr(0, 10)}</td>
                <td>{member.response?.sex==="남성" ? "남성" : "여성"}</td>
                <td><RadioMember member={member} /></td>
            </tr>
            {member.response?.contactPointList?.map(cp => (
            <tr key={member.id + cp.cpType}>
                <td></td>
                <td>{cp.cpType}</td>
                <td colSpan='4' align="left">{cp.cpVal}</td>
            </tr>
            ))}
        </>
    ))
}
