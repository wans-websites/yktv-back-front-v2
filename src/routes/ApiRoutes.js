import axios from "axios";

export const nodeInstance = axios.create({
  /**
   * Cloud Server
   */
  baseURL: "https://fad1-196-216-82-74.ngrok-free.app/",
  // baseURL: "https://yktv-api.vercel.app/",
  /**
   * Local server
   */
  // baseURL: "http://192.168.0.24:5050",
  /**
   * Mobile Hotspot
   */
  //   baseURL: "http://192.168.43.168:5000",
});
