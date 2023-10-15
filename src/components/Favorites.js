import React from 'react'
import { useLocation } from 'react-router';

export default function Favorites() {
    const location = useLocation();
    let state = location.state;
    console.log(state);
  return (
    <div>Favorites</div>
  )
}
