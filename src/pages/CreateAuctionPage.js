import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAuction.css'; 

const CreateAuctionPage = () => {
  const navigate = useNavigate();
  
  // Khai báo state để lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    title: '',
    startPrice: '',
    imageUrl: '',
    description: ''
  });

  // ĐỊNH NGHĨA HÀM HANDLECHANGE (Lỗi của bạn nằm ở đây)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu đấu giá:", formData);
    alert("Tạo phiên đấu giá thành công!");
  };

  return (
    <div className="create-page-wrapper">
      <div className="container">
        <div className="create-card shadow-container">
          <button className="btn-back" onClick={() => navigate('/')}>
            ← Quay lại trang chủ
          </button>
          
          <h2 className="form-title">Tạo phiên đấu giá mới</h2>
          <p className="form-subtitle">Điền thông tin sản phẩm để bắt đầu đấu giá.</p>

          <form className="auction-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input 
                type="text" 
                name="title" // Phải trùng với tên trong formData
                placeholder="Ví dụ: Rolex Submariner 2024" 
                value={formData.title}
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Giá khởi điểm (₫)</label>
                <input 
                  type="number" 
                  name="startPrice"
                  placeholder="0" 
                  value={formData.startPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Link ảnh sản phẩm</label>
                <input 
                  type="text" 
                  name="imageUrl"
                  placeholder="https://..." 
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mô tả chi tiết</label>
              <textarea 
                name="description"
                rows="5" 
                placeholder="Tình trạng sản phẩm..." 
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">Bắt đầu đấu giá ngay</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionPage;