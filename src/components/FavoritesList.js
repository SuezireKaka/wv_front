import React from 'react'
import { AxiosAuth, Fetch } from 'toolbox/Fetch'
import axios from 'api/axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';
import SeriesCardsFavorites from 'component-showcase/SeriesCardsFavorites';
import { useState } from 'react';
import { useLocation } from 'react-router';
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import OriginalViewOne from "atom/OriginalViewOne";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function FavoritesList() {
  const [page, setPage] = useState(1);
  const location = useLocation();
  let state = location.state;
  const { auth } = useContext(AppContext);
  const uri = `/work/favoritesAll/1`
  const [postList, setPostList] = useState([]);


  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);



  function renderSuccess(_, data){
    console.log(data)
    console.log(data?.data)
    console.log(data?.data?.firstVal)
    const series = data?.data?.firstVal;
    return (
      <SeriesCardsFavorites series={series}/>
    );
  }

  return (
        <>
             <AxiosAuth uri={uri} auth={auth} renderSuccess={renderSuccess}/>
        </>
  )
}
