import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-GN8VehNcEA2ynRdh1z1ewXuJlR8ZAuQ",
  authDomain: "web-dau-gia-vmt.firebaseapp.com",
  projectId: "web-dau-gia-vmt",
  storageBucket: "web-dau-gia-vmt.firebasestorage.app",
  messagingSenderId: "292407469171",
  appId: "1:292407469171:web:af52ed99f3106fc6437606",
  measurementId: "G-EN458VKCRG"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Xuất các dịch vụ để sử dụng ở các file khác
export const db = getFirestore(app);     // Dùng cho Database (Sản phẩm, Giá thầu)
export const auth = getAuth(app);         // Dùng cho Đăng nhập
export const storage = getStorage(app);   // Dùng để upload ảnh sản phẩm

export default app;