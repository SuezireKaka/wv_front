import './App.css';
import BBSRouter from 'router/BBSRouter';
import axios from 'api/axios';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';
// 연동 잘 되는지 테스트해보자


const getCodeList = async (uri, setCodeList) => {
  const response = await axios.get(uri);
  setCodeList(response?.data);
}
const getRemocon = async (uri, setRemocon) => {
  const response = await axios.get(uri);
  setRemocon(response?.data);
}

export default function App() {
  const {
    codeList, setCodeList,
    rptCodeList, setRptCodeList, 
    relationRemocon, setRelationRemocon} = useContext(AppContext);
  if (!codeList) {
    getCodeList("/framework/anonymous/listAllContactPointType", setCodeList);
  }
  if (!rptCodeList) {
    getCodeList("/report/anonymous/listAllReportCodes", setRptCodeList);
  }
  if (!relationRemocon) {
    getRemocon("/framework/anonymous/getRemoconByName/relation_remocon", setRelationRemocon);
  }
  return (
    <div className="App">
      <BBSRouter/>
    </div>
  );
}
