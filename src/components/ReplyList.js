import axios from 'api/axios';
import NewReply from './NewReply';
import AppContext from "context/AppContextProvider";
import { useContext, useState } from 'react';
import { displayDate } from "toolbox/DateDisplayer";
import { useLocation } from 'react-router';

export default function ReplyList({parent}) {
    const { auth } = useContext(AppContext);

    const location = useLocation();
    const state = location.state;
    console.log(auth)
    console.log(state)
    console.log(parent)
    console.log(parent.id)
    const [justCreatedReplyList, setJustCreatedReplyList] = useState([]);
    const [openAddReplay] = useState(new Map());
    const [replayOnReply] = useState(new Map());

    const [renderCnt, setRenderCnt] = useState(0);

    function onInputReplyContent(e, replyId) {
        const content = e.target.value;
        replayOnReply.set(replyId, content);
        setRenderCnt(renderCnt + 1);
    }

    function markShowAddReply(e, replyId) {
        openAddReplay.set(replyId, 1);
        setRenderCnt(renderCnt + 1);
    }

	const mngReply = async (e, parentId) => {
        // 목적: 재 조회 방지. 성능
        // parent 객체의 댓글 목록 ul을 찾아서 동적으로 강제적으로 넣기
        e.preventDefault();
        console.log(parentId);
        console.log(parent.id);
        let hTier = parent?.hTier;
        console.log(hTier);
		if (replayOnReply.get(parentId) === null || (replayOnReply&&replayOnReply?.get(parentId)?.length === 0))
			return;
        const writer = {id:auth?.userId, nick:auth?.nick, loginId:auth?.loginId};
		const bodyData = {
            firstVal:{id:parentId, hTier:hTier-1},
	        secondVal:{id:parent?.id, writer:writer, boardVO:{id:parent?.boardVO.id},
            title:"", content:replayOnReply.get(parentId), hTier}
        };
		console.log(JSON.stringify(bodyData));

		try {
			const response = await axios.post(
				"/work/manageWork",
				bodyData,
				{headers: {
					'Content-Type': 'application/json',
					"x-auth-token": `Bearer ${auth.accessToken}`}}
			);
            const reply = response.data;
            console.log(reply);
            setJustCreatedReplyList([reply, ...justCreatedReplyList]);
            replayOnReply.set(parentId, "");
            setRenderCnt(renderCnt + 1);
		} catch (err) {
			console.log('Registration Failed');
		}
	}

    function appendJustCreatedReply(newReply, parent) {
        if (parent.listReply&&!parent?.listReply.includes(newReply))
            parent.listReply = [newReply, ...parent.listReply];
    }

    justCreatedReplyList.forEach((newReply)=>{appendJustCreatedReply(newReply, parent)})

    return <>
            {auth.nick ? <>
            {console.log(parent.id)}
            <button variant="primary" onClick={(e)=>{markShowAddReply(e, parent.id)}}>
                댓글
            </button>
            </> :  ""}
            {console.log(parent)}
            {openAddReplay}
            {console.log(openAddReplay)}
            {openAddReplay.has(parent.id) ? 
            <NewReply auth={auth} reply={parent} state= {{seriesId:state.seriesId, parent, state, parentId : state.parentId}} replayOnReply={replayOnReply} onInputReplyContent={onInputReplyContent} mngReply={mngReply}/> 
            : ""}
            <ul>
        {parent.repliesList?.map((reply) => {
            return <li key={reply.id}>
                ▸▸ <span>{reply.content}</span>
                &nbsp;&nbsp; <span>{displayDate(reply.regDt, reply.uptDt)} </span>
                &nbsp;&nbsp; <span>{reply.writer ? reply.writer.nick : ""} </span>
                <ReplyList parent={reply}/>
            </li>
        })}
    </ul>
    </>
}


