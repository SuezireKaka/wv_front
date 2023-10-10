
import Home from 'components/Home';

import { Route, Routes } from 'react-router';



export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          
        </Routes>
       
      )
}
