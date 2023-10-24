import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let user = window.sessionStorage.getItem("nowUser");
    console.log(user ? JSON.parse(user) : "야");
    const [auth, setAuth] = useState(user ? JSON.parse(user) : {nick : "", roles : []});
    const [codeList, setCodeList] = useState();
    const [rptCodeList, setRptCodeList] = useState();
    
    return (
        <AppContext.Provider value={{ auth, setAuth, codeList, setCodeList, rptCodeList, setRptCodeList }}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext;