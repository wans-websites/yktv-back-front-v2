import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4DmAcqnuvNqdVqrTbWdp5h2LMak6p_lY",
  authDomain: "yktv-19589.firebaseapp.com",
  projectId: "yktv-19589",
  storageBucket: "yktv-19589.appspot.com",
  messagingSenderId: "154214458772",
  appId: "1:154214458772:web:6a8262431fdacf81561b81",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
