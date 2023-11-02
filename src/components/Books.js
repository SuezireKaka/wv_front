import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';

const Books = ({ title }) => {
    const [query, setQuery] = useState('웹툰');
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);
    const [documents, setDocuments] = useState(null);
    const callAPI = async () => {
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&page=${page}`;
        const config = { headers: 'Authorization: KakaoAK 248bbf725d08a367356e79cf03f2859a' };
        const result = await axios(url, config);
        console.log(result);
        setDocuments(result.data.documents);
        const total = result.data.meta.pageable_count;
        setLast(Math.ceil(total / 10))
    }

    useEffect(() => {
        callAPI();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        setPage(1);
    }

    if (documents === null) {
        return <h1>로딩중........</h1>
    }

    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='검색어' value={query} onChange={(e) => setQuery(e.target.value)} />
                <button>검색</button>
            </form>
            <Col>
                <div className='documents'>
                    {documents.map(d => (
                        <div className='box'>
                            <img src={d.thumbnail ? d.thumbnail : 'http://via.placeholder.com/120X150'} alt="" />
                            <div className='ellipsis'>{d.title}</div>
                            <div className='ellipsis'>{d.authors[0]}</div>
                        </div>
                    ))}
                </div></Col>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</button>
                <span style={{ margin: '10px' }}>{page}/{last}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === last}>다음</button>
            </div>

        </div>
    )
}
export default Books