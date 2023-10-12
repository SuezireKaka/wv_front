import LoginStage from "./LoginStage";
import { useContext } from "react";
import AppContext from "context/AppContextProvider";

export default function LoginCheck({user = {}}) {
    const { setAuth } = useContext(AppContext);

    const onLogout = () => {
        setAuth({nick : "", roles : [""]});
        window.sessionStorage.setItem("nowUser", JSON.stringify({}));
    };

    console.log(user);

    return (!user || !user["nick"])
    ? <LoginStage />
    : <p>프로필 준비중</p>
    {/*<UserProfile className="TopUserInfo"
        nick={user["nick"]}
        avatar_url={user["profURL"]}
        name={user["name"]}
        editable={true}
        onLogout={() => onLogout()}
    />;*/}
}