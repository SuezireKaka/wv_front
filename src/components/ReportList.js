import { useState, useEffect, useContext } from "react";
import axios from "api/axios";
import AppContext from "context/AppContextProvider";
import { useLocation } from "react-router";
import { Table } from "react-bootstrap";
import { displayDate } from "toolbox/DateDisplayer";
import LoginTypeIcon from "toolbox/LoginTypeIcon";
import { Link } from "react-router-dom";
import ReportDetails from "./ReportDetails";

export default function ReportList() {
    const {auth} = useContext(AppContext);
    const location = useLocation();
    let state = location.state;

    //const [targetBoard, setTargetBoard] = useState(state.boardId);
    const [reportList, setReportList] = useState([]);
    const [page, setPage] = useState(1);
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);

    const getPostListThenSet = async () => {
        try {
            const { data } = await axios.get(`/report/listAllReports/${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });
            console.log("읽어온 신고 목록", data?.firstVal);
            setReportList(reportList.concat(data?.firstVal));
        } catch {
            console.error('fetching error');
        }
    };

    //observer 콜백함수
    const onIntersect = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
                setPage((prev) => prev + 1);
                // 현재 타겟을 unobserve한다.
                observer.unobserve(entry.target);
            }
        });
    };

    useEffect(() => {
        console.log('page ? ', page);
        getPostListThenSet();
    }, [page]);

    useEffect(() => {
        //observer 인스턴스를 생성한 후 구독
        let observer;
        if (lastIntersectingImage) {
            observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
            //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(randomImageList 배열의 마지막 아이템)으로 지정
            observer.observe(lastIntersectingImage);
        }
        return () => observer && observer.disconnect();
    }, [lastIntersectingImage]);
    return <>
    <Table striped variant="light">
          <thead>
            <th>작성일</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>첨부</th>
          </thead>
          <tbody>
        {reportList.map((report, index) => {
            console.log(report)
            return index === reportList.length - 1
            ? <>
            <tr ref={setLastIntersectingImage}>
                <td>{displayDate(report.regDt, report.uptDt)}</td>
                <td>
                    <LoginTypeIcon loginType={report?.reporter?.accountType}/>
                    {!report.reporter?.nick ?report.reporter?.kakaoNick  :report.reporter?.nick}
                </td>
                <td><Link to={`/ReportDetails/${report.id}`} style={{ all: "unset", cursor: "pointer" }} state={{report}}>{report.suspectTable} - {report.suspectId}</Link></td>
                <td>{(report?.listAttachFile && report.listAttachFile?.length > 0) ? "O" : "X"}</td>
            </tr>
            <tr>
                <td colSpan={5}>{report.rptTypesList.map((type)=>(
                  <>{type.rptType}  </>))}</td>
            </tr> 
            </>
            : <>
                <tr>
                <td>{displayDate(report.regDt, report.uptDt)}</td>
                <td>
                    <LoginTypeIcon loginType={report?.reporter?.accountType}/>
                    {!report.reporter?.nick ?report.reporter?.kakaoNick  :report.reporter?.nick}
                </td>
                <td><Link to={`/ReportDetails/${report.id}`} style={{ all: "unset", cursor: "pointer" }} state={{report}}>{report.suspectTable} - {report.suspectId}</Link></td>
                <td>{(report?.listAttachFile && report.listAttachFile?.length > 0) ? "O" : "X"}</td>
            </tr>
            <tr>
                <td colSpan={5}>{report?.rptTypesList.map((type)=>(
                  <>{type.rptType}  </>))}</td>
            </tr> 
            </>
        })}
            </tbody>
        </Table>

    </>
}