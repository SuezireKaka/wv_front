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

export default function App() {
  const { codeList, setCodeList, rptCodeList, setRptCodeList } = useContext(AppContext);
  if (!codeList) {
    getCodeList("/framework/anonymous/listAllContactPointType", setCodeList);
  }
  if (!rptCodeList) {
    getCodeList("/report/anonymous/listAllReportCodes", setRptCodeList);
  }
  return (
    <div className="App">
      <BBSRouter/>
    </div>
  );
}
