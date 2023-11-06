import React from 'react'
import { displayDate } from 'toolbox/DateDisplayer'
export default function ReportSuspect({data}) {
    console.log(data)
  return (
    <table><thead>
    <th>보드</th>
    <th>구분</th>
    <th>포스트ID</th>
    <th>제목</th>
    <th>작성일</th>
    <th>작성자</th>
    <th></th>
    <th></th>
  </thead>
    <tbody>
      <tr>
      <td>{data?.boardVO?.id}</td>
      <td>{data?.ksuspectType}</td>
      <td>{data?.id}</td>
      <td>{data?.title}</td>
      <td>{displayDate(data?.regDt, data?.uptDt)}</td>
      <td>{data?.writer?.nick}</td>
      <td></td>
      <td></td>
      </tr>
      <tr>
      <td>내용:</td>
      <td colSpan="4">{data?.content?.substring(0, 30)}</td>
      <td></td>
      <td></td>
      </tr>
    </tbody>
  </table>
  )
}