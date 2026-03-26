import { db } from "../config/firebase";
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  increment 
} from "firebase/firestore";

// 1. Hàm tạo một sản phẩm đấu giá mới
export const createAuctionItem = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      currentBid: productData.startPrice, // Giá hiện tại khởi đầu bằng giá sàn
      createdAt: serverTimestamp(),
      status: "active" // active, ended
    });
    return docRef.id;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    throw error;
  }
};

// 2. Hàm đặt giá thầu (Hàm quan trọng nhất)
export const placeBid = async (productId, newAmount, userId) => {
  const productRef = doc(db, "products", productId);

  try {
    // Cập nhật giá thầu mới và lưu ID người đặt giá cao nhất
    await updateDoc(productRef, {
      currentBid: newAmount,
      highestBidder: userId,
      lastBidAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Lỗi khi đặt thầu:", error);
    return false;
  }
};