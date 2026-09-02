import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const productsCollection = collection(db, "products");

// جلب جميع المنتجات
export async function getProducts() {
  const productsQuery = query(productsCollection, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// جلب منتج بواسطة ID
export async function getProductById(id) {
  const productRef = doc(db, "products", id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// جلب منتج بواسطة الرابط
export async function getProductBySlug(slug) {
  const productsQuery = query(productsCollection, where("slug", "==", slug));

  const snapshot = await getDocs(productsQuery);

  if (snapshot.empty) {
    return null;
  }

  const item = snapshot.docs[0];

  return {
    id: item.id,
    ...item.data(),
  };
}

// إضافة منتج
export async function addProduct(product) {
  const productData = {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(productsCollection, productData);

  return {
    id: docRef.id,
    ...product,
  };
}

// تعديل منتج
export async function updateProduct(id, updatedProduct) {
  const productRef = doc(db, "products", id);

  const productData = {
    ...updatedProduct,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(productRef, productData);

  return {
    id,
    ...updatedProduct,
  };
}

// حذف منتج
export async function deleteProduct(id) {
  const productRef = doc(db, "products", id);

  await deleteDoc(productRef);

  return true;
}
