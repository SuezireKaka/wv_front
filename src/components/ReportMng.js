import { useLocation } from "react-router";
import { useContext, useState } from "react";
import AppContext from "context/AppContextProvider";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import AttachedFileList from 'atom/AttachedFileList';
import ThumbnailList from 'atom/ThumbnailList';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Fetch} from 'toolbox/Fetch';
import CheckboxGroup from "toolbox/CheckboxGroup";
import Checkbox from "toolbox/Checkbox";
 

export default function ReportMng() {
    const [reportDetails, setReportDetails] = React.useState([]);
    const { auth } = useContext(AppContext);

    const location = useLocation();
    let state = location.state;

    const [type, setType] = useState();
	const [content, setContent] = useState();
	const [listAttach, setListAttach] = useState();
    
    // 일단 하드코딩 : 나중에 서버에서 받아올 것
    const reportCauseArray = [
        {rptType : "지나친 선정성", rptInfo : "대충 설명 1", checked : false},
        {rptType : "지나친 폭력성", rptInfo : "대충 설명 2", checked : false},
        {rptType : "혐오적 콘텐츠", rptInfo : "대충 설명 3", checked : false},
        {rptType : "테러조장", rptInfo : "대충 설명 4", checked : false},
        {rptType : "아동학대", rptInfo : "대충 설명 5", checked : false},
        {rptType : "허위광고", rptInfo : "대충 설명 6", checked : false},
        {rptType : "저작권 침해", rptInfo : "대충 설명 7", checked : false}
    ]

    const STYLE = {width : "50px 30%"}

    return <> <CheckboxGroup
    values={reportDetails}
    onChange={setReportDetails}
    >
    <>[{reportDetails.join(",")}]<button disabled={reportDetails==[]}>체크박스에 담기</button></>
    <Form style={STYLE}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>신고사유를 선택해주세요</Form.Label>
            <br/>
            
            {reportCauseArray.map((cause, index) => <><Checkbox value={index}></Checkbox><Form.Check
                inline
                label={cause.rptType}
                type="checkbox"
                id={`inline-checkbox-${index}`}
            /></>)}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>신고사유를 구체적으로 적어주세요</Form.Label>
            <Form.Control as="textarea" style={{resize : "none"}} rows={6} />
        </Form.Group>
        <label>증거가 될 만한 첨부파일이 있다면 올려주세요</label>
        <ThumbnailList imgDtoList={listAttach}/>
		<AttachedFileList writer={auth} listAttach={listAttach} setListAttach={setListAttach}/>
		<Button variant="primary" style={{backgroundColor:"tomato", borderColor:"tomato"}}>
			신고하기
		</Button>
    </Form> </CheckboxGroup></>
}