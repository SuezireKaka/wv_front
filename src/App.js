import './App.css';
import BBSRouter from 'router/BBSRouter';
import axios from 'api/axios';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';
// 연동 잘 되는지 테스트해보자


const getCodeList = async (setCodeList) => {
  const response = await axios.get("/framework/anonymous/listAllContactPointType");
  setCodeList(response?.data);
}

export default function App() {
  const { codeList, setCodeList } = useContext(AppContext);
  if (!codeList) {
    getCodeList(setCodeList);
  }
  return (
    <div className="App">
      <BBSRouter/>
    </div>
  );
}
