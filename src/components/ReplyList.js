import axios from 'api/axios';
import ReplyNew from './ReplyNew';
import AppContext from "context/AppContextProvider";
import { useContext, useState } from 'react';
import { displayDate } from "toolbox/DateDisplayer";
import { useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import LoginTypeIcon from 'toolbox/LoginTypeIcon';

export default function ReplyList({parent}) {
    const { auth } = useContext(AppContext);
    const location = useLocation();
    const state = location.state;
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

	const mngReply = async (e, parentId, isEditing) => {
        // 목적: 재 조회 방지. 성능
        // parent 객체의 댓글 목록 ul을 찾아서 동적으로 강제적으로 넣기
        e.preventDefault();
        let hTier = parent?.hTier;
		if (replayOnReply.get(parentId) === null || (replayOnReply&&replayOnReply?.get(parentId)?.length === 0))
			return;
        const writer = {id:auth?.userId, nick:auth?.nick, loginId:auth?.loginId}
        console.log(writer);

		const bodyData = {
            firstVal:{id:parentId, hTier:hTier-1},
	        secondVal:{id:isEditing?null:null, writer:writer, boardVO:{id:parent?.boardVO.id},
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
            setJustCreatedReplyList([reply, ...justCreatedReplyList]);
            replayOnReply.set(parentId, "");
            setRenderCnt(renderCnt + 1);

            window.location.replace(`/post/${state.id}`);  //페이지 새로고침
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
            <Button variant="outline-primary" onClick={(e)=>{markShowAddReply(e, parent.id)}}>
                댓글
            </Button>
            </> :  ""}
            {openAddReplay.has(parent.id) ? 
            <ReplyNew auth={auth} reply={parent} state= {{seriesId:state.seriesId, parent, state, parentId : state.parentId}} replayOnReply={replayOnReply} onInputReplyContent={onInputReplyContent} mngReply={mngReply}/> 
            : ""}
            <ul>
        {parent.repliesList?.map((reply) => {
            return <li key={reply.id}  align="left">
                <span>{reply.content}</span>
                &nbsp;&nbsp; <span>{displayDate(reply.regDt, reply.uptDt)} </span>
                &nbsp;&nbsp; <span><LoginTypeIcon loginType={reply?.writer?.accountType}/>{reply.writer ? reply.writer.nick : ""} </span>
                <ReplyList parent={reply}/>
            </li>
            })}
    </ul>
    </>
}


