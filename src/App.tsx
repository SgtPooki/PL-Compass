import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Home } from './pages/Home'
import { Stats } from './pages/Stats'
import { Search } from './pages/Search'
import { About } from './pages/About'
import { GithubToken } from './components/GithubToken'
import './App.css'
import { Header } from './components/Header'
import { GithubRibbon } from './components/GithubRibbon/GithubRibbon'
function App() {
  return (
    <HashRouter>
      <div className="App">
        <GithubRibbon />
        <Header />
        <GithubToken />
        <Routes>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="stats" element={<Stats />} />
          <Route path="search" element={<Search />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
