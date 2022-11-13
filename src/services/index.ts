/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import environment from '../environment';

export const axiosHandler = async (method: string, url: string, data?: any) => {
  return await axios({
    method,
    url: `${environment.API_URL}/${url}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data,
  });
};

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export enum ServicesPaths {
  USERS = 'users',
}
