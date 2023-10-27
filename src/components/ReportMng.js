import { useLocation, useNavigate } from "react-router";
import { useContext, useState, useMemo } from "react";
import AppContext from "context/AppContextProvider";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import AttachedFileList from 'atom/AttachedFileList';
import ThumbnailList from 'atom/ThumbnailList';
import React from 'react';
import axios from 'api/axios';
import CheckboxGroup from "toolbox/CheckboxGroup";
import Checkbox from "toolbox/Checkbox";



export default function ReportMng() {

    const { auth, rptCodeList } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    let state = location.state;
    const report = state?.report;
    const suspect = state?.suspect;
    console.log(report);

    const [reportTypes, setReportTypes] = useState([]);
    const [cause, setCause] = useState();
    const [listAttach, setListAttach] = useState(report?.listAttachFile);
    const [hasAnyType, setHasAnyType] = useState(report?.listAttachFile);

    useMemo(() => {
		setHasAnyType(reportTypes?.length > 0);
	}, [reportTypes])

    const STYLE = { width: "50px 30%" }

    const handleSubmit = async (e) => {
		
		e.preventDefault();
        if (!hasAnyType)
			return;
		
		const reporter = {id:auth?.userId, nick:auth?.nick, loginId:auth?.loginId};
		const bodyData = {
            reporter : reporter,
            suspect : suspect,
            cause : cause,
            rptTypesList : reportTypes.map(rpt => {})
		};
		console.log(JSON.stringify(bodyData));

		try {
			await axios.post(
				"/report/manageReport",
				bodyData,
				{headers: {
					'Content-Type': 'application/json',
					"x-auth-token": `Bearer ${auth?.accessToken}`}}
			);

			if (!report?.id) {
				//글쓰기
				console.log('//글쓰기 ttt');
				navigate(-1, {state:{boardId:report?.boardVO?.id, page:1, search:""}});
			} else {
				//수정
				console.log('수정', report);
				navigate(-1, {state:state});
			}
			
		} catch (err) {
			console.log('Registration Failed', err);
		}
	}

    return <>
        [{reportTypes.join(", ")}]
        <Form style={STYLE}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>신고사유를 선택해주세요</Form.Label>
                <br />
                <CheckboxGroup values={reportTypes} onChange={setReportTypes}>
                    {rptCodeList?.map(cause => <>
                        <Checkbox value={cause.rptType}>
                            {cause.rptType}
                        </Checkbox>
                    </>)}
                </CheckboxGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>신고사유를 구체적으로 적어주세요</Form.Label>
                <Form.Control as="textarea" style={{ resize: "none" }} rows={6} />
            </Form.Group>
            <label>증거가 될 만한 첨부파일이 있다면 올려주세요</label>
            <ThumbnailList imgDtoList={listAttach} />
            <AttachedFileList writer={auth} listAttach={listAttach} setListAttach={setListAttach} />
            <Button variant="outline-danger" onClick={handleSubmit}>
                신고하기
            </Button>
        </Form>
    </>
}