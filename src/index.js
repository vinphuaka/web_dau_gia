import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateAuction from './pages/CreateAuctionPage'; 
import Header from './components/Header'; // 1. Phải import Header vào đây
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Đặt Header ở đây để nó hiện ở cả trang Chủ và trang Tạo đấu giá */}
      <Header /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateAuction />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);