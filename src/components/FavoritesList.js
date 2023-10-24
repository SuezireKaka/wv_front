import React from 'react'
import { AxiosAuth, Fetch } from 'toolbox/Fetch'
import axios from 'api/axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from 'context/AppContextProvider';

export default function FavoritesList() {
  const { auth } = useContext(AppContext);
  console.log(auth);
  const url = `/work/favoritesAll`
  function renderSuccess(data){
    console.log(data)
    return <>adf</>
  }


  return (
        <>
             <AxiosAuth url={url} auth={auth} renderSuccess={renderSuccess}/>
        </>
  )
}
