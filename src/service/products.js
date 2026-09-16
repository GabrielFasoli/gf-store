import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs.map((productDocument) => ({
      id: productDocument.id,
      ...productDocument.data(),
    }));
  } catch (error) {
    throw new Error("No se pudieron obtener los productos", {
      cause: error,
    });
  }
};

export const getProductsById = async (id) => {
  try {
    const productDocument = doc(db, "products", id);
    const productsSnapshot = await getDoc(productDocument);
    return {
      id: productsSnapshot.id,
      ...productsSnapshot.data(),
    };
  } catch (error) {
    throw new Error("No se pudieron obtener los productos", {
      cause: error,
    });
  }
};

export const addProducts = async (addPro) => {
  try {
    const products = collection(db, "products");
    const newProduct = await addDoc(products, {
      ...addPro,
      createdAt: serverTimestamp(),
    });
    return {
      id: newProduct.id,
    };
  } catch (error) {
    throw new Error("No se pudo agregar el producto", { cause: error });
  }
};
export const createOrder = async (order) => {
  try {
    const ordersRef = collection(db, "orders");
    const newOrder = await addDoc(ordersRef, {
      ...order,
      createdAt: serverTimestamp(),
    });
    return { id: newOrder.id };
  } catch (error) {
    throw new Error("No se pudo generar la orden", { cause: error });
  }
};
