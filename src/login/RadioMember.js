import axios from 'api/axios';
import React from 'react'
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import { useState } from 'react';

export default function RadioMember({member}) {
    console.log("member===========");
    console.log(member);
    const [value, setValue] =useState(member?.roleList[0]?.role);
    const [roles, setRoles] = React.useState([]);

    const radioMember = async (value, memberId) => {
       
        console.log(value);
        console.log(memberId);

		const bodyData = {
            role:value,
            writer:memberId
        };
		console.log(JSON.stringify(bodyData));

		try {
			const response = await axios.post(
				"/party/reRole",
				bodyData,
				{headers: {
					'Content-Type': 'application/json'
					}}
			);
            console.log(response);
            setValue(value);
            // reply = response.data;
            //console.log(reply);
            //setJustCreatedReplyList([reply, ...justCreatedReplyList]);
            //replayOnReply.set(parentId, "");
            //setRenderCnt(renderCnt + 1);
		} catch (err) {
			console.log('Registration Failed');
		}
	}

  return (
    <div><article>
        {console.log(value)}
            <RadioGroup value={value} onChange={setValue}>
                {member?.roleList[0]?.role==="writer"?
                    <><Radio name={`${member.id}`} value="writer" checked>writer</Radio>
                    <Radio name={`${member.id}`} value="reader">reader</Radio></>:
                    <><Radio name={`${member.id}`} value="writer" >writer</Radio>
                    <Radio name={`${member.id}`} value="reader" checked>reader</Radio></>}
            </RadioGroup>
            <button variant="primary" onClick={(e)=>{radioMember(value, member.id)}}>
                변경
            </button>
    </article>


    </div>
  )
}
/*
                <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`${e.target.contact.value}를 통해 연락드리겠습니다!`);
        //<>[{roles.join(",")}]<button disabled={roles==[]}>writer로 변경</button></>
      }}
    >

    </form>

*/