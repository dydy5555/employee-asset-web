
import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  

export const API_URL = process.env.apiUrl;
export const KEY = process.env.KEY;

let session:any = '';
let token: any;
let url;


// Without Token
export const api = axios.create({
    baseURL: API_URL,
  });

  // With Token
const ihttp = axios.create({
    baseURL: API_URL,
  });
  export default ihttp;