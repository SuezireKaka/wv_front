import './App.css';

import axios from 'api/axios';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';
// 연동 잘 되는지 테스트해보자
import WVRouter from 'router/WVRouter';

const getSystemUse = async (uri, setter = f => f) => {
  const response = await axios.get(uri);
  setter(response?.data);
}

export default function App() {
  const {
    cpCodeList, setCpCodeList = f => f,
    rptCodeList, setRptCodeList, 
    relationRemocon, setRelationRemocon,
    explorerRemocon, setExplorerRemocon} = useContext(AppContext);
  if (!cpCodeList) {
    getSystemUse("/framework/anonymous/listAllContactPointType", setCpCodeList);
  }
  if (!rptCodeList) {
    getSystemUse("/report/anonymous/listAllReportCodes", setRptCodeList);
  }
  if (!relationRemocon) {
    getSystemUse("/framework/anonymous/getRemoconByName/relation_remocon", setRelationRemocon);
  }
  if (!explorerRemocon) {
    getSystemUse("/framework/anonymous/getRemoconByName/explorer_remocon", setExplorerRemocon);
  }
  console.log("그래서 시스템이 어케 되나요?", cpCodeList, rptCodeList, relationRemocon, explorerRemocon)
  return (
    <div className="App">
      <WVRouter/>
    </div>
  );
}
