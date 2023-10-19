import axios from 'axios';
import React from 'react'

const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: 'KakaoAK 248bbf725d08a367356e79cf03f2859a',
  },
});

// search book api
export const bookSearch = (params) => {
  return Kakao.get('/v3/search/book', { params });
};


export default function Test3() {
  return (
    <div><button onClick={bookSearch}>버튼</button></div>
  )
}
