import {useFatch, usePost} from "hooks/useFatch.js"

function Fetch({uri, renderSuccess = f => f,
    loadingFallBack = <p>loading...</p>,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>),
    doLog = false}) {

    const {loading, data, error} = useFatch(uri, doLog);

    if (doLog) {
        console.log("어디 한 번 해보자");
        console.log(uri, loading, data);
    }

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        console.log("로딩 끝났다~!");
        return renderSuccess(data);
    }
}

function AxiosPost({uri, body, renderSuccess = f=>f,
    loadingFallBack = <p>loading...</p>,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>)}) {

    const {loading, data, error} = usePost(uri, body);

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        return renderSuccess(body, data);
    }
}

export {Fetch, AxiosPost};