import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";


export const API_URL = process.env.apiUrl;
export const API_URL1 = process.env.apiUrl1;
const KEY = process.env.KEY;

let session:any = '';
let token: any;
let url;

// Feteched Token from URL
if (typeof window !== "undefined") {
  url = new URL(window.location.href);
  token = url.searchParams.get("tid") || localStorage.getItem("tid");
}

console.log({token})

// Without Token
export const api = axios.create({
  baseURL: API_URL,
});

// With Token
const ihttp = axios.create({
  baseURL: API_URL,
});
export const ihttp1 = axios.create({
  baseURL: API_URL1,
})

// Getting Session

export async function getSession() {
    try {
      const headers = { 'Authorization': `Bearer ${token}`};
      const res = await fetch(`${API_URL}/api/v1/session?token=${encodeURIComponent(token!)}&key=${encodeURIComponent(KEY!)}`, { headers });
      const data = await res.json();
      session = data.payload;
       const permission = await fetch(`${API_URL}/api/v1/admin/permission/${session?.userId}`, { headers });
      localStorage.setItem("tid", session?.token);
      return session;
    } catch (e) {
      return null;
    }
}

export async function getPermission(userId:any, token:any) {
  try {
    const headers = { 'Authorization': `Bearer ${token}`};
    const permission = await fetch(`https://bizweb-adm.kosign.dev/api/v1/admin/permission/${userId}`, { headers });
    const data = await permission.json();
    const result = data.payload;
    return result;
  } catch (e) {
    return null;
  }
}
  
  (async () => {
    const session = await getSession();
  })();


  export async function fetchSessionAndPermission() {
    try {
      const session = await getSession();
      if (session) {
        const per = await getPermission(session.userId, session.token);
        return per;
      } else {
        console.error('Failed to fetch session.');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }



async function requestInterceptor(config: InternalAxiosRequestConfig) {
  if (!session) {
      await getSession();
  }
  const idToken: any = session;
  if (!idToken) {
    return Promise.reject("missing access token");
  }
  config.headers["Authorization"] = `Bearer ${idToken?.token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
}
async function requestInterceptorFormData(
  config: InternalAxiosRequestConfig
) {
  if (!session) {
      await getSession();
  }
  const idToken: any = session;
  if (!idToken) {
    return Promise.reject("missing access token");
  }
  config.headers["Authorization"] = `Bearer ${idToken?.token}`;
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
}

async function responseInterceptor(value: AxiosResponse<any, any>) {
  return value;
}

async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
  const isNotWorkError = code == "ERR_NETWORK";
  if (isNotWorkError) {
    try {
      //
      window.location.pathname = "/error"
    } catch {
    }
  }
  return Promise.reject({ ...err, status, code });
}

ihttp.interceptors.request.use(requestInterceptor);
ihttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export const ihttpFormData = axios.create({
  baseURL: API_URL,
});
ihttpFormData.interceptors.request.use(requestInterceptorFormData);
ihttpFormData.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
export default ihttp;
