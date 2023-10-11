import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let user = window.sessionStorage.getItem("nowUser");
    console.log(user ? JSON.parse(user) : "야");
    const [codeList, setCodeList] = useState();

    return (
        <AppContext.Provider value={{ auth, setAuth, codeList, setCodeList }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;