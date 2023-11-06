import React from 'react'
import { Fetch } from 'toolbox/Fetch'
import { useLocation } from "react-router-dom";
import { displayDate } from 'toolbox/DateDisplayer';

export default function Reporter({ report }) {
  return (
    <table><thead>
      <th>구분</th>
      <th>신고인</th>
      <th>신고일</th>
      <th>신고이유</th>
    </thead>
      <tbody>
        <tr>
        <td>{report.reporter.accountType}</td>
        {report?.reporter?.accountType === "원더" ?
          <td>{report.reporter.nick}</td> :
          <td>{report?.reporter?.accountType}</td>}
        <td>{displayDate(report?.regDt, report?.uptDt)}</td>
        <td>{report?.cause}</td>
        </tr>
        <tr>
        {report?.rptTypesList?.map((rptType)=><td>{rptType.rptType}/</td>)}
        </tr>
      </tbody>
    </table>

  )
}
