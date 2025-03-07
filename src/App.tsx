import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './pages/Layout';
import LoginPage from './pages/login/Login';
import Store from './pages/Store/Store';
import Sku from './pages/Sku/Sku';
import Planning from './pages/Planning/Planning';
import Charts from './pages/Charts/Charts';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/store" element={<Layout> <Store /> </Layout>} />
      <Route path="/sku" element={<Layout> <Sku /> </Layout>} />
      <Route path="/planning" element={<Layout> <Planning /> </Layout>} />
      <Route path="/charts" element={<Layout> <Charts /> </Layout>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
