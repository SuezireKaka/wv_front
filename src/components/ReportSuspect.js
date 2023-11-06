import React from 'react'
import { displayDate } from 'toolbox/DateDisplayer'
import { Table } from 'react-bootstrap'
import MemberRoleList from 'login/MemberRoleList'

export default function ReportSuspect({report, data}) {
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
      <td>{data?.title}</td>
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