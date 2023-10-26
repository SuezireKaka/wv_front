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
import { Fetch } from 'toolbox/Fetch';
import CheckboxGroup from "toolbox/CheckboxGroup";
import Checkbox from "toolbox/Checkbox";
import { InputGroup } from "react-bootstrap";



export default function ReportMng() {
    const { auth, rptCodeList } = useContext(AppContext);
    const location = useLocation();
    let state = location.state;
    const [reportDetails, setReportDetails] = useState([]);
    const [type, setType] = useState();
    const [content, setContent] = useState();
    const [listAttach, setListAttach] = useState();

    const STYLE = { width: "50px 30%" }

    return <>
        [{reportDetails.join(", ")}]
        <Form style={STYLE}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>신고사유를 선택해주세요</Form.Label>
                <br />
                <CheckboxGroup values={reportDetails} onChange={setReportDetails}>
                    {rptCodeList.map(cause => <>
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
            <Button variant="primary" style={{ backgroundColor: "tomato", borderColor: "tomato" }}>
                신고하기
            </Button>
        </Form>
    </>
}