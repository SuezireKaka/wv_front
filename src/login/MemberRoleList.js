import axios from 'api/axios';
import React from 'react'
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import { useState } from 'react';
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';


export default function MemberRoleList({member}) {
    const [value, setValue] =useState(member?.roleList[0]?.role);
    const [roles, setRoles] = React.useState([]);
    const [listCheckMember, setListCheckMember] = useState(new Map());
    const { auth } = useContext(AppContext);
    console.log(member)
    const [colors, setColors] = React.useState(["green"]);




    const radioMember = async (value, memberId) => {
      listCheckMember.set(memberId, value);

      setListCheckMember(listCheckMember);

		const bodyData = {
            accountId:member.id,
            role:value,
        };
		console.log(JSON.stringify(bodyData));

		try {
			const response = await axios.get(
				`/party/reRole/${memberId}`,
				bodyData,
				{headers: {
					'Content-Type': 'application/json',
          "x-auth-token": `Bearer ${auth?.accessToken}`}
					}
			);
            setValue(value);
		} catch (err) {
			console.log('Registration Failed');
		}
	}

  return (
    <div>
      {member?.roleList?.map((role)=>(<>
     
      <CheckboxGroup values={roles} onChange={setRoles}>
        <Checkbox value="reader" checked={role.role==="reader"}>reader</Checkbox>
        <Checkbox value="writer" checked={role.role==="writer"}>writer</Checkbox>
        <Checkbox value="manager" checked={role.role==="manager"}>manager</Checkbox>
        <Checkbox value="admin" checked={role.role==="admin"} disabled>admin</Checkbox>
      </CheckboxGroup>
      <footer>[{roles.join(",")}]을 좋아하시군요!</footer>
      </>))}
    </div>
  )
}