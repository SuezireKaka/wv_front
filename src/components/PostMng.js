import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";
import AttachedFileList from 'atom/AttachedFileList';
import ThumbnailList from 'atom/ThumbnailList';
import CheckboxGroup from "toolbox/CheckboxGroup";
import Checkbox from "toolbox/Checkbox";
import PostGenreList from './PostGenreList';
import { useMemo } from 'react';

export default function PostMng() {
	const location = useLocation();
    const { auth, genreCodeList } = useContext(AppContext);
	const post = location.state?.post;
    const state = location.state?.state;
	console.log(genreCodeList);
	console.log(auth);
	console.log(post);
	console.log(state);
	const parentId = location.state?.parentId;
	
	const navigate = useNavigate();
	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.content);
	const [listAttach, setListAttach] = useState(post?.listAttachFile);
	const isComplete = useState(1);
	let hTier;
	const [genreTypes, setGenreTypes] = useState([]);
    const [hasAnyType, setHasAnyType] = useState([]);
	console.log("너가 첨부파일 갖고 있다며?", listAttach)

	useMemo(() => {
		setHasAnyType(genreTypes?.length > 0);
	}, [genreTypes])

	const [hasAllContents, setHasAllContents] = useState();
	useEffect(() => {
		setHasAllContents(title?.trim() ? content?.trim() : false);
	}, [title, content])

	const handleSubmit = async (e) => {
		
		e.preventDefault();
		console.log(parentId+"----")
		console.log(post);
		if (!hasAllContents)
			return;
		console.log(post?.id);
		console.log(parentId);
		const writer = {id:auth?.userId, nick:auth?.nick, loginId:auth?.loginId};
		console.log(post?.boardVO?.id)
		const bodyData = {
			writer:writer, id:post?.id ? post.id : parentId+"----", boardVO:{id:(state&&state?.boardId!=0?state?.boardId:post?.boardVO?.id)},
			title:title.trim(), content:content.trim(), hTier, isComplete:isComplete[0], listAttachFile:listAttach,
            genreTypesList : genreTypes.map(gen => {
				{console.log(gen)}
                return {genre : gen}
            }),
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
			const data = await axios.delete(`/work/${post?.id}`,
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
		<Form.Group className="mb-3" >
			{/*<Form.Label >글제목</Form.Label>*/}
			<Form.Control
				type="text"
				value={title}
				id="title"
				placeholder="글제목"
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
		</Form.Group>
		<PostGenreList genreTypes={genreTypes} setGenreTypes={setGenreTypes}/>
		{genreTypes}
		<Form.Group className="mb-3" >
			{/*<Form.Label >글내용</Form.Label>*/}
			<Form.Control
				as="textarea"
				value={content}
				rows="5"
				id="content"
				placeholder="글내용"
				onChange={(e) => setContent(e.target.value)}
				required
			/>
		</Form.Group>
		
		<ThumbnailList imgDtoList={listAttach}/>

		<AttachedFileList writer={auth} listAttach={listAttach} setListAttach={setListAttach}/>
		<Button variant="outline-primary" onClick={handleSubmit} disabled={!hasAllContents} >
			반영
		</Button>
		<Button variant="outline-dark" onClick={handleDelete}>
			삭제
		</Button>
		
	</Form>
}

