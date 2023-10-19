import React, {useEffect, useState, useRef} from "react";

const Showcase0 = () => {

    const [totalData, setTotalData] = useState([]); // 렌더링되는 전체 데이터
    const [isLoading, setIsLoading] = useState(false); // 새로운 데이터를 추가로 불러올 때 로딩처리를 위해
    const [nextInfo, setNextInfo] = useState({
        hasNext: false,
        nextPage: 0,
    }); // 다음 데이터 존재 여부

    useEffect(() => {
        callData(1); // 초기값 불러오기
    }, []);

    const observerRef = useRef(null);

    const observer = (node) => {

        if (isLoading) return;

        observerRef.current && observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(async ([entry]) => {
            if (entry.isIntersecting && nextInfo.hasNext) {
                await callData(nextInfo.nextPage);
            }
        });

        node && observerRef.current.observe(node);

    };

    const callData = async (pageNum) => { // 데이터 추가로 불러오는 로직

        setIsLoading(true); //로딩 true

        const selectData = await fetch(`/work/anonymous/listAllSeries/0002/${pageNum}`, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }); // 데이터 불러오기

        setTotalData((prev) => [...prev, ...selectData.data]); // 불러온 데이터 추가

        setNextInfo((prev) => ({
            ...prev,
            hasNext: selectData.hasNext,
            nextPage: selectData.page + 1,
        })); // 다음 데이터 존재 여부 최신화

        setIsLoading(false);  //로딩 false

    }

    return (

        <div style={{
            position: "absolute",
            width: '50%',
            height: '500px',
            overflow: 'auto',
        }}>

            {
                totalData.map((dr, idx) => {
                    return <div key={idx} style={{
                        width: '200px',
                        height: '160px',
                        margin: "20px",
                        border: "1px solid black"
                    }}> {dr.name} </div>
                })
            }

            {
               nextInfo.hasNext && <div ref={observer}/>
            }

            {
                isLoading && <div> Loading </div>
            }

        </div>

    )

}

export default Showcase0;