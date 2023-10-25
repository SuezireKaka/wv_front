import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Fetch } from 'toolbox/Fetch';
import { displayDate } from "toolbox/DateDisplayer";
import CheckboxGroup from '../toolbox/CheckboxGroup';
import Checkbox from '../toolbox/Checkbox';
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import axios from 'api/axios';
import MemberRoleList from './MemberRoleList';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function MemberList() {
    const { ownerId } = useParams();
    const location = useLocation();
    let state = location.state;
    //const [targetBoard, setTargetBoard] = useState(state.boardId);
    const [memberList, setMemberList] = useState([]);
    const [page, setPage] = useState(1);
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);

    const getPostListThenSet = async () => {
        try {
            const { data } = await axios.get(`/party/anonymous/listAllAccount/0000/${page}`);
            console.log("읽어온 멤버 목록", data?.firstVal);
            setMemberList(memberList.concat(data?.firstVal));
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
    return <Table className='react-bootstrap-table' style={{width:"100%"}}>
        <thead>
            <tr style={{ backgroundColor: "#eeffdd" }}>
                <th style={{ backgroundColor: "#eeffdd" }}>아이디</th>
                <th style={{ backgroundColor: "#eeffdd" }}>닉</th>
                <th style={{ backgroundColor: "#eeffdd" }}>이름</th>
                <th style={{ backgroundColor: "#eeffdd" }}>생년월일</th>
                <th style={{ backgroundColor: "#eeffdd" }}>성별</th>
                <th style={{ backgroundColor: "#eeffdd" }}>분류</th>
               
            </tr>
        </thead>
        <tbody>
            {console.log(memberList)}
            {memberList?.map((member, index) => {
                if (index === memberList.length - 1) {
                    return (
                        <>
                            <tr key={member.id} ref={setLastIntersectingImage}>
                                <td><b>{member.loginId}</b></td>
                                <td><b>{member.nick}</b></td>
                                <td><b>{member.response?.name}</b></td>
                                <td>{member.response?.birthDate?.substr(0, 10)}</td>
                                <td>{member.response?.sex === "남성" ? "남성" : "여성"}</td>
                                <td>{member?.roleList[0]?.role}</td>{/*<MemberRoleList member={member} /> */}
                         
                            </tr>
                            {member.response?.contactPointList?.map(cp => (
                                <tr key={member.id + cp.cpType}>
                                    <td></td>
                                    <td>{cp.cpType}</td>
                                    <td colSpan='4' align="left">{cp.cpVal}</td>
                                </tr>
                            ))}
                        </>
                    );
                } else {
                    return (
                        <>
                            <tr key={member.id}>
                                <td><b>{member.loginId}</b></td>
                                <td><b>{member.nick}</b></td>
                                <td><b>{member.response?.name}</b></td>
                                <td>{member.response?.birthDate?.substr(0, 10)}</td>
                                <td>{member.response?.sex === "남성" ? "남성" : "여성"}</td>
                                <td>{member?.roleList[0]?.role}</td>{/*<MemberRoleList member={member} /> */}
                                
                            </tr>
                            {member.response?.contactPointList?.map(cp => (
                                <tr key={member.id + cp.cpType}>
                                    <td></td>
                                    <td>{cp.cpType}</td>
                                    <td colSpan='4' align="left">{cp.cpVal}</td>
                                </tr>
                            ))}
                        </>
                    );
                }
            })
            }
        </tbody>
    </Table>
}
