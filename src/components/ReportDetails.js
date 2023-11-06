import React from 'react'
import { Fetch } from 'toolbox/Fetch'
import { useLocation } from "react-router-dom";
import Reporter from './Reporter';
import ReportSuspect from './ReportSuspect';

export default function ReportDetails() {

  const location = useLocation();
  let state = location.state.report;
  let report = location.state.report
  console.log(report)

  function renderWork(data){
    console.log(data)
    console.log(report)
    return <><fieldset>
    <legend>신고 상세(포스트)</legend>
    <Reporter report={report}/>
    <ReportSuspect data={data} />
    </fieldset></>
  }
  function renderParty(data){
    console.log(data)
    console.log(report)
    return <><fieldset>
    <legend>신고 상세(유저)</legend>
    <Reporter report={report}/>
    <ReportSuspect data={data}/>
    </fieldset></>
  }


  return (
    <>
    {report.suspectTable === "t_account " ?
    <Fetch uri={`/party/findById/${report.suspectId}`} renderSuccess={renderParty} />
    :<Fetch uri={`/work/anonymous/findById/${report.suspectId}`} renderSuccess={renderWork} />}
    </>
  )
}
