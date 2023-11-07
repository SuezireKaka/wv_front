import axios from 'api/axios';
import React from 'react'
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import { useState } from 'react';
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function MemberRoleList({ member }) {
  console.log(member)
  const [value, setValue] = useState(member?.roleList[0]?.role);
  const [roles, setRoles] = React.useState([]);
  const [listCheckMember, setListCheckMember] = useState(new Map());
  const { auth } = useContext(AppContext);
  const navigate = useNavigate();
  const reRole = async (e, value, memberId) => {
    e.preventDefault();
    console.log(value)
    console.log(memberId)
    const bodyData = {
      accountId: memberId,
      role: value,
    };
    console.log(JSON.stringify(bodyData));

    try {
      const response = await axios.get(
        `/party/reRole/${memberId}/${value}`,
        
        {
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`
          }
        }
      );
      setValue(value);
      navigate(0)
    } catch (err) {
      console.log('Registration Failed');
    }
  }

  return (
    <div><td>
      {member?.roleList?.map((role) => (
        <RadioGroup value={value} onChange={setValue} >
          <Radio value="reader" checked={role === "reader"}>Reader</Radio>
          <Radio value="writer" checked={role === "writer"}>Writer</Radio>
          <Radio value="manager" checked={role === "manager"}>Manager</Radio>
          <Radio value="admin" checked={role === "admin"} disabled>Admin</Radio>
        </RadioGroup>    ))}</td>
        <td><Button onClick={(e)=>reRole(e,value, member.id)} variant="outline-success">변경</Button></td>
    </div>
  )
}