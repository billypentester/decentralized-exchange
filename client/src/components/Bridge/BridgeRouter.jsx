import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Bridge from './Bridge'
import UseBridge from './UseBridge'
import BridgeLiquidity from './BridgeLiquidity'
import BridgePositions from './BridgePositions'

import RemoveBridgeLiquidityMum from './RemoveBridgeLiquidityMum'
import RemoveBridgeLiquidityBsc from './RemoveBridgeLiquidityBsc'
function PoolRouter() {
  return (
    <>
        <Routes>
          <Route path="/" element={ <Bridge /> } />
          <Route path="/use" element={ <UseBridge /> } />
          <Route path="/liquidity" element={ <BridgeLiquidity /> } />
          <Route path="/positions" element={ <BridgePositions /> } />
          <Route path="/liquiditystat/remove/MUM" element={ <RemoveBridgeLiquidityMum /> } />
          <Route path="/liquiditystat/remove/BSC" element={ <RemoveBridgeLiquidityBsc /> } />
        </Routes>
    </>
  )
}

export default PoolRouter