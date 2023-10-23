import React, { useState } from 'react'
import { useLocation } from 'react-router';
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import Checkbox from 'toolbox/Checkbox';
import CheckboxGroup from 'toolbox/CheckboxGroup';
import { FaStar } from "react-icons/fa"
import axios from 'api/axios';

export default function Favorites() {
    const location = useLocation();
    let state = location.state;

    const [color,setColor] = useState("blue");
    const { auth } = useContext(AppContext);
    const[favorites, setFavorites] = useState(false);
    console.log(state);
    console.log(auth);

    const onPress = async (e)=>{
      e.preventDefault();
      if(favorites===false){
        setColor("gray")
        setFavorites(true)
      }else{
        setColor("blue")
        setFavorites(false)
      }
      console.log("시리즈 아이디 : "+ state.seriesId)
      console.log("유저 아이디 : "+ auth.userId)
      console.log(favorites)

      const bodyData = {
        writer:auth?.userId,
        id:state?.seriesId,
        favorites:favorites
      };
      console.log(JSON.stringify(bodyData));
  
      try {
        await axios.post(
          "/party/favorites",
          bodyData,
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
