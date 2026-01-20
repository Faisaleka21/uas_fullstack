import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

interface CallAPIProps extends AxiosRequestConfig {
  data?: FormData;
  token?: boolean; //untuk mngerimin token. JWT
  serverToken?: string; //Server side (yg loading di bgian tertentu saja), client server(yg loading keseluruhannya)
  contentType?: string; //untuk mengirim data json
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
  contentType,
}: CallAPIProps) {
  let headers: Record<string, string> = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      // JWT tokens should be used raw, not decoded with atob.
      headers = {
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }

  const response = await axios({
    url,
    method,
    data,
    headers: {
      ...headers,
      ...(contentType ? { 'Content-Type': contentType } : (data instanceof FormData ? {} : { 'Content-Type': 'application/json' })),
    },
  }).catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  const { length } = Object.keys(response.data);
  const res = {
    error: false,
    message: 'success',
    data: length > 2 ? response.data : response.data.data, //ganti 2, 1 jg bisa tetapi diubah bgian page.tsx
  };

  return res;
}
