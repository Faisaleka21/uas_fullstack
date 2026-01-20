import callAPI from '@/config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;  //mengambil url di backendnnya
const API_VERSION = 'api/v1';

export async function service(params: string, serverToken?: string) {
  const url = `${ROOT_API}/${API_VERSION}/${params}`;

  return callAPI({
    url,
    method: 'GET',
    serverToken: serverToken,
    token: true,
  });
}

export async function serviceStore(
  params: string,
  data: FormData,
  method: 'POST' | 'PUT' = 'POST'
) {
  const url = `${ROOT_API}/${API_VERSION}/${params}`;

  // Handle method spoofing if PUT is requested with FormData
  if (method === 'PUT') {
    data.append('_method', 'PUT');
    method = 'POST';
  }

  return callAPI({
    url,
    method: method,
    data,
    token: true,
  });
}

export async function serviceShow(
  params: string,
  id: string,
  serverToken?: string
) {
  const url = `${ROOT_API}/${API_VERSION}/${params}/${id}`;

  return callAPI({
    url,
    method: 'GET',
    serverToken: serverToken,
    token: true,
  });
}

export async function serviceEdit(params: string, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/${params}/${id}/edit`;

  return callAPI({
    url,
    method: 'GET',
    serverToken: token,
  });
}

export async function serviceUpdate(
  params: string,
  data: FormData,
  id: string | number | number[]
) {
  const url = `${ROOT_API}/${API_VERSION}/${params}/${id}`;

  // Laravel doesn't support PUT with multipart/form-data out of the box.
  // We use method spoofing by sending a POST request with _method=PUT.
  data.append('_method', 'PUT');

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}

export async function serviceDestroy(params: string, id: string | number) {
  const url = `${ROOT_API}/${API_VERSION}/${params}/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}
