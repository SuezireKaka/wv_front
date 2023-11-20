import React, { useState, useEffect, useContext } from 'react';
import axios from 'api/axios';
import MemberRoleList from './MemberRoleList';
import { Table } from 'react-bootstrap';
import AppContext from "context/AppContextProvider";
import LoginTypeIcon from 'toolbox/LoginTypeIcon';

export default function MemberList() {
    const { auth } = useContext(AppContext);
    const [memberList, setMemberList] = useState([]);
    const [page, setPage] = useState(1);
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
    const backgroundColorTD = {
        backgroundColor: "#00CDFF"
    }

    const getPostListThenSet = async () => {
        try {
            const { data } = await axios.get(`/party/listAllAccount/0000/${page}/id`, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            });

            setMemberList(memberList.concat(data?.firstVal));
        } catch {
            console.error('fetching error');
        }
    };

    const onIntersect = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setPage((prev) => prev + 1);
                observer.unobserve(entry.target);
            }
        });
    };

    useEffect(() => {
        console.log('page ? ', page);
        getPostListThenSet();
    }, [page]);

    useEffect(() => {
        let observer;
        if (lastIntersectingImage) {
            observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
            observer.observe(lastIntersectingImage);
        }
        return () => observer && observer.disconnect();
    }, [lastIntersectingImage]);

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
        <thead>
            <tr>
                <th style={backgroundColorTD}>아이디</th>
                <th style={backgroundColorTD}>닉</th>
                <th style={backgroundColorTD}>이름</th>
                <th style={backgroundColorTD}>생년월일</th>
                <th style={backgroundColorTD}>성별</th>
                <th style={backgroundColorTD} colSpan={1}>분류</th>
            </tr>
        </thead>
        <tbody>
            {memberList?.map((member, index) => {
                if (index === memberList.length - 1) {
                    return (
                        <>
                            <tr key={member.id} ref={setLastIntersectingImage}>
                                <td><b>{member.loginId ? member.loginId : "비공개"}</b></td>
                                <td><b>{<LoginTypeIcon loginType={member.accountType} />} {member.nick ? member.nick : member.kakaoNick}</b></td>
                                <td><b>{member.response?.name}</b></td>
                                <td>{member.response?.birthDate?.substr(0, 10)}</td>
                                <td>{member.response?.sex === "남성" ? "남성" : member.response?.sex === "여성" ? "여성" : "비공개"}</td>
                                <td><MemberRoleList member={member} /></td>
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
                                <td><b>{member.loginId ? member.loginId : "비공개"}</b></td>
                                <td><b>{<LoginTypeIcon loginType={member.accountType} />} {member.nick ? member.nick : member.kakaoNick}</b></td>
                                <td><b>{member.response?.name}</b></td>
                                <td>{member.response?.birthDate?.substr(0, 10)}</td>
                                <td>{member.response?.sex === "남성" ? "남성" : member.response?.sex === "여성" ? "여성" : "비공개"}</td>
                                <td><MemberRoleList member={member} /></td>
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
