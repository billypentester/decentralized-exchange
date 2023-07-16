import * as React from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import './index.css';

import Navbar from './components/Utilities/Navbar';

import Landing from "./components/Landing"
import Swap from "./components/Swap"

import TokenRouter from "./components/Tokens/TokenRouter"
import PoolRouter from "./components/Pools/PoolRouter"
import BridgeRouter from "./components/Bridge/BridgeRouter"

import Error from "./components/Utilities/Error"

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Navbar shadow={ location.pathname === "/" ? false : true } />
      <Routes>
        <Route path="/" element={ <Landing/> } />
        <Route path="/swap" element={ <Swap/> } />
        <Route path="/tokens/*" element={ <TokenRouter/> } />
        <Route path="/pools/*" element={ <PoolRouter/> } />
        <Route path="/bridge/*" element={ <BridgeRouter/> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
    </div>
  );
}
export default App;