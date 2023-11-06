import React from 'react'
import { displayDate } from 'toolbox/DateDisplayer'
import { Table } from 'react-bootstrap'
import MemberRoleList from 'login/MemberRoleList'
import { Link } from 'react-router-dom'

export default function ReportSuspectPost({report, data}) {
    console.log(report)
  return (
    <Table><thead>
    <td></td>
    <th>보드</th>
    <th>구분</th>
    <th>포스트ID</th>
    <th>제목</th>
    <th>작성일</th>
    <th>작성자</th>


  </thead>
    <tbody>
      <tr>
      <td rowSpan="2" width="10%">신고대상</td>
      <td>{data?.boardVO?.id}</td>
      <td>{data?.ksuspectType}</td>
      <td>{data?.id}</td>
      
                   
      <td><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${data?.id}`} state={{ seriesId: data?.id, page: 1 }}>{data?.title}</Link></td>
      <td>{displayDate(data?.regDt, data?.uptDt)}</td>
      <td>{data?.writer?.nick}</td>


      </tr>
      <tr>
      <td>내용:</td>
      <td colSpan="5" width="70%">{data?.content?.substring(0, 30)}</td>
      
      </tr>
    </tbody>
  </Table>
  )
}