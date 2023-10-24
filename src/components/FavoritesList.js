import React from 'react'
import { AxiosAuth, Fetch } from 'toolbox/Fetch'
import axios from 'api/axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';

export default function FavoritesList() {
  const { auth } = useContext(AppContext);
  console.log(auth);
  const url = `/work/favoritesAll/1`

  function renderSuccess(_, data){
    console.log(data)
    return <p>adf</p>
  }

  return (
        <>
             <AxiosAuth uri={url} auth={auth} renderSuccess={renderSuccess}/>
        </>
  )
}
