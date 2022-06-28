import { IApiResponse } from './basic/types';
import { request } from './basic/request';

// 获取用户
export const getUser = async (params = {}) =>
  request.post<unknown, IApiResponse>('demo/user', params);
