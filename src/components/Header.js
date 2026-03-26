import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Đảm bảo đã import file CSS riêng

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="nav-container">
        
        {/* KHỐI TRÁI: Logo & Danh mục */}
        <div className="nav-left">
          <div className="logo" onClick={() => navigate('/')}>ĐẤU GIÁ VMT</div>
          <div className="nav-item-wrapper">
            <div className="nav-link" onClick={() => setOpenMenu(openMenu === 'cat' ? null : 'cat')}>
              Danh Mục <span>⌄</span>
            </div>
            {openMenu === 'cat' && (
              <div className="dropdown-menu">
                <div className="dropdown-item"><span>🎨</span> Nghệ Thuật</div>
                <div className="dropdown-item"><span>⌚</span> Đồng Hồ</div>
                <div className="dropdown-item"><span>💎</span> Trang Sức</div>
              </div>
            )}
          </div>
        </div>

        {/* KHỐI GIỮA: Thanh tìm kiếm (Mới) */}
        <div className="search-bar-container">
          <div className="search-inner">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* KHỐI PHẢI: Icons & Nút Đăng Bán */}
        <div className="nav-right">
          <div className="nav-icons">
            <span>❤️</span>
            <span>🔔</span>
            <span>👤</span>
          </div>
          <button className="btn-bid" onClick={() => navigate('/create')}>
            + Đăng Bán
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Header;