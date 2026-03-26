import React, { useState } from 'react';
import { placeBid } from '../services/auctionService';

// Đổi tham số nhận vào thành { item } để khớp với Home.js
const AuctionCard = ({ item }) => {
  const [bidValue, setBidValue] = useState('');

  const handleBid = async () => {
    const amount = Number(bidValue);
    // Kiểm tra giá thầu dựa trên currentBid (nếu có) hoặc startPrice (giá khởi điểm)
    const currentPrice = item.currentBid || item.startPrice;
    
    if (!bidValue || amount <= currentPrice) {
      alert(`Giá thầu phải cao hơn giá hiện tại (${Number(currentPrice).toLocaleString()} ₫)!`);
      return;
    }
    
    try {
      await placeBid(item.id, amount, 'User_Guest');
      setBidValue('');
      alert("Đặt giá thành công!");
    } catch (error) {
      console.error("Lỗi đặt giá:", error);
    }
  };

  return (
    <div className="auction-card shadow-container">
      <div className="card-image-container">
        <div className="status-badge">LIVE</div>
        {/* Dùng item.imageUrl từ Firebase */}
        <img 
          src={item.imageUrl || 'https://via.placeholder.com/400x300'} 
          alt={item.title} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300'; }}
        />
      </div>

      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.description?.substring(0, 60)}...</p>
        
        <div className="bid-info">
          <div className="price-box">
            <span className="price-label">Giá hiện tại</span>
            {/* Hiển thị currentBid nếu có, nếu chưa có ai đấu giá thì hiện startPrice */}
            <div className="current-price">
              {(item.currentBid || item.startPrice || 0).toLocaleString()} ₫
            </div>
          </div>
        </div>

        <div className="bid-action-row">
          <input 
            type="number" 
            className="bid-input-light"
            placeholder="Nhập giá..."
            value={bidValue}
            onChange={(e) => setBidValue(e.target.value)}
          />
          <button className="btn-bid-card" onClick={handleBid}>Đặt Giá</button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;