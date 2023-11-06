import React from 'react'
import { displayDate } from 'toolbox/DateDisplayer'
import { Table } from 'react-bootstrap'
import MemberAuthRoleList from 'login/MemberAuthRoleList'
import MemberRoleList from 'login/MemberRoleList'
export default function ReportSuspectUser({suspectUser, report}) {
    console.log(suspectUser)
    console.log(report);
  return (
    <Table><thead>
    <th></th>
    <th>닉</th>
    <th>분류</th>
    <th>아이디</th>
    <th>신고일</th>
    <th>등급</th>
    <th></th>
  </thead>
    <tbody>
      <tr>
      <td rowSpan="2" width="10%">신고대상</td>
      <td>{suspectUser?.nick}</td>
      <td>{suspectUser?.accountType}</td>
      <td>{suspectUser?.loginId}</td>
      <td>{displayDate(report?.regDt, report?.uptDt)}</td>
      <td ><MemberRoleList report={report} member={suspectUser} /></td>
      <td></td>

      </tr>
      <tr>
      <td colSpan={5}>[유저상태변경]</td>
      
      </tr>
    </tbody>
  </Table>
  )
}