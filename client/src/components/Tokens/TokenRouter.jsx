import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Tokens from './Tokens'
import CreateToken from './CreateToken'
import TopTokens from './TopTokens'
import TokenStats from './TokenStats'

function TokenRouter() {
  return (
    <>
        <Routes>
          <Route path="/" element={ <Tokens /> } />
          <Route path="/create" element={ <CreateToken /> } />
          <Route path="/top" element={ <TopTokens /> } />
          <Route path="/stats/:id" element={ <TokenStats /> } />
        </Routes>
    </>
  )
}

export default TokenRouter