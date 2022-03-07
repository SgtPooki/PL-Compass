import React from 'react'
import logo from './logo.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'

import './App.css'
import { Header } from './components/Header'
import { GithubRibbon } from './components/GithubRibbon/GithubRibbon'
function App() {
  return (
    <div className="App">
      <GithubRibbon />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="expenses" element={<Expenses />} /> */}
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
