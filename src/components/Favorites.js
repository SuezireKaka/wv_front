import React, { useState } from 'react'
import { useLocation } from 'react-router';
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { FaStar } from "react-icons/fa"
import axios from 'api/axios';

export default function Favorites({favorites, setFavorites=f=>f}) {
    const location = useLocation();
    let state = location.state;
    console.log("☆favorites");
    console.log(favorites);

    const [color, setColor] = useState(favorites?"blue":"gray");
    const { auth } = useContext(AppContext);

    const onPress = async (e)=>{
      //e.preventDefault();
      if(favorites===false){
        setColor("yellow")
        setFavorites(true)
      }else{
        setColor("red")
        setFavorites(false)
      }
      console.log(favorites)
/*
      const bodyData = {
        writer:auth?.userId,
        id:state?.seriesId,
        favorites:favorites
      };
      console.log(JSON.stringify(bodyData));
*/
      try {
        await axios.get(
          `/work/toggleFavorites/${state.seriesId}`,
          {headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`}}
        );
        
      } catch (err) {
        console.log('Registration Failed', err);
      }
    }


    
  return (
          <>
              <FaStar color={color} onClick={e=>{onPress(e)}}/>
          </>
  )
}
