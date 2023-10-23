import axios from 'api/axios';
import React from 'react'
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import { useState } from 'react';
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
export default function RadioMember({member}) {
    console.log("member===========");
    console.log(member);
    const [value, setValue] =useState(member?.roleList[0]?.role);
    const [roles, setRoles] = React.useState([]);
    const [listCheckMember, setListCheckMember] = useState(new Map());
    const { auth } = useContext(AppContext);
    const radioMember = async (value, memberId) => {
      listCheckMember.set(memberId, value);

      setListCheckMember(listCheckMember);
      console.log(listCheckMember)
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
					'Content-Type': 'application/json',
          "x-auth-token": `Bearer ${auth?.accessToken}`}
					}
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
        <td>
            <RadioGroup value={value} onChange={setValue}>
                {member?.roleList[0]?.role==="writer"?
                    <><Radio name={`${member.id}`} value="writer" checked>writer</Radio>
                    <Radio name={`${member.id}`} value="reader">reader</Radio></>:
                    <><Radio name={`${member.id}`} value="writer" >writer</Radio>
                    <Radio name={`${member.id}`} value="reader" checked>reader</Radio></>}
            </RadioGroup></td>
            <td>
            <button variant="primary" onClick={(e)=>{radioMember(value, member.id)}}>
                변경
            </button></td>
    </article>


    </div>
  )
}