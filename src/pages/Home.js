import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import AuctionCard from "../components/AuctionCard";
import "./Home.css"; // Chúng ta sẽ tạo file CSS riêng này

const Home = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "auctions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAuctions(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="home-wrapper">
      {/* Phần Banner chào mừng (Tùy chọn) */}
      <section className="hero-banner">
        <div className="container">
          <h1>Sàn Đấu Giá Trực Tuyến ĐẤU GIÁ VMT</h1>
          <p>Nơi săn lùng những món đồ độc bản với mức giá tốt nhất</p>
        </div>
      </section>

      {/* Phần danh sách sản phẩm */}
      <main className="container main-content">
        <div className="section-header">
          <h2>🔥 Phiên Đấu Giá Đang Diễn Ra</h2>
          <div className="filter-tags">
            <span className="tag active">Tất cả</span>
            <span className="tag">Bất động sản</span>
            <span className="tag">Đồng hồ</span>
          </div>
        </div>

        <div className="auction-grid">
          {auctions.length > 0 ? (
            auctions.map((item) => <AuctionCard key={item.id} item={item} />)
          ) : (
            <div className="loading-container">
              <p>Đang tải các phiên đấu giá hấp dẫn...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
