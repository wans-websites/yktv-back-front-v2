import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase API Keys
const env_path = require("path");
require("dotenv").config({
  path: env_path.resolve(__dirname, "../env/.env.local"),
}); // Load .env file from ./env/.env.local

const fbApiKey = process.env.FIREBASE_API_KEY;
const fbAuthDomain = process.env.FIREBASE_AUTH_DOMAIN;
const fbProjectId = process.env.FIREBASE_PROJECT_ID;
const fbStorageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const fbMessagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const fbAppId = process.env.FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: fbApiKey,
  authDomain: fbAuthDomain,
  projectId: fbProjectId,
  storageBucket: fbStorageBucket,
  messagingSenderId: fbMessagingSenderId,
  appId: fbAppId,
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
