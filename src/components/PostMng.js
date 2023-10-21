import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";
import AttachedFileList from 'atom/AttachedFileList';
import ThumbnailList from 'atom/ThumbnailList';

export default function PostMng() {
	const location = useLocation();

	const post = location.state?.post;
    const state = location.state?.state;
	const parentId = location.state?.parentId;
	const { auth } = useContext(AppContext);

	console.log("포스트는", post);
	console.log("스테이트는", state);
	console.log("지금 유저 정보는", auth);
	
	const navigate = useNavigate();
	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.content);
	const [listAttach, setListAttach] = useState(post?.listAttachFile);
	const isComplete = useState(1);
	console.log(isComplete[0]);
	let hTier;
	

	console.log("부모 아이디는", parentId)

	const [hasAllContents, setHasAllContents] = useState();
	useEffect(() => {
		setHasAllContents(title?.trim() ? content?.trim() : false);
	}, [title, content])

	const handleSubmit = async (e) => {
		
		e.preventDefault();
		if (!hasAllContents)
			return;
		
		const writer = {id:auth?.userId, nick:auth?.nick, loginId:auth?.loginId};
		const bodyData = {
			firstVal : {id:parentId, hTier:hTier-1},
			secondVal : {id:post?.id, writer:writer, boardVO:{id:state?.boardId},
			title:title.trim(), content:content.trim(), hTier, isComplete:isComplete[0], listAttachFile:listAttach}
		};
		console.log(JSON.stringify(bodyData));

		try {
			await axios.post(
				"/work/manageWork",
				bodyData,
				{headers: {
					'Content-Type': 'application/json',
					"x-auth-token": `Bearer ${auth?.accessToken}`}}
			);
			console.log("==============나오나 확인======");
			console.log('post.id', post?.id);
			if (!post?.id) {
				//글쓰기
				console.log('//글쓰기 ttt');
	
				navigate(-1, {state:{boardId:post?.boardVO?.id, page:1, search:""}});
			} else {
				//수정
				console.log('수정', post);
				navigate(-1, {state:state});
			}
			
		} catch (err) {
			console.log('Registration Failed', err);
		}
	}
	
	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const data = await axios.delete(`/work/${post.id}`,
				{headers: {
					'Content-Type': 'application/json',
					"x-auth-token": `Bearer ${auth.accessToken}`}});
		} catch (err) {
			console.log('Delete Failed', err);
		} finally {
			// navigate state 전달
			console.log('Delete state', state);
			navigate(-1, {state:state});
		}
	}

	return <Form>
		<h3>글쓰기</h3>
		<hr />
		<Form.Group className="mb-3" >
			<Form.Label >글제목:</Form.Label>
			<Form.Control
				type="text"
				value={title}
				id="title"
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
		</Form.Group>

		<Form.Group className="mb-3" >
			<Form.Label >글내용:</Form.Label>
			<Form.Control
				as="textarea"
				value={content}
				rows="5"
				id="content"
				onChange={(e) => setContent(e.target.value)}
				required
			/>
		</Form.Group>
		<ThumbnailList imgDtoList={listAttach}/>
		<AttachedFileList writer={auth} listAttach={listAttach} setListAttach={setListAttach}/>
		<Button variant="primary" onClick={handleSubmit} disabled={!hasAllContents} >
			반영
		</Button>
		<Button variant="primary" onClick={handleDelete}>
			삭제
		</Button>
	</Form>
}

