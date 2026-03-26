import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAuction.css'; 
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';  

const CreateAuction = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    startPrice: '',
    imageUrl: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, "auctions"), {
      ...formData,
      createdAt: serverTimestamp(),
      status: 'active'
    });
    alert("Tạo phiên đấu giá thành công!");
    navigate('/'); // Quay về trang chủ
  } catch (error) {
    console.error("Lỗi khi lưu:", error);
  }
};

  return (
    <div className="create-page-wrapper">
      <div className="create-card">
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Quay lại trang chủ
        </button>

        <h2 className="form-title">Tạo phiên đấu giá mới</h2>

        <form onSubmit={handleSubmit} className="auction-form">
          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input 
              type="text" 
              name="title"
              placeholder="Nhập tên sản phẩm..." 
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
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Link ảnh</label>
              <input 
                type="text" 
                name="imageUrl"
                placeholder="https://..." 
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <textarea 
              name="description"
              rows="4" 
              placeholder="Mô tả sản phẩm..." 
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Bắt đầu đấu giá ngay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;