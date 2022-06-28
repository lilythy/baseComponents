// import { throttle } from '@/utils';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosUtils, { AxiosUtilsOptions } from '@perfma/axios-utils';
import { routeBase, apiPath } from '@/utils/config';

/**
 * axios 工厂
 */
export const createAxios = (
  requestConfig: AxiosRequestConfig,
  utilsOptions?: AxiosUtilsOptions,
): AxiosInstance => {
  const http = axiosUtils.create(
    {
      timeout: 60 * 1000,
      withCredentials: true,
      ...requestConfig,
    },
    {
      extractResultData: true,
      ignoreLoginKey: 'ignoreLogin',
      ignoreNoticeKey: 'ignoreNotice',
      ...{
        loginHandler: () => {
          // axios-utils 内置登陆处理函数跳转至 /login/
          const href = `${routeBase}/login/?redirectPath=${encodeURIComponent(
            window.location.href,
          )}`;
          window.location.href = href;
        },
      },
      ...utilsOptions,
    },
  );
  return http;
};

/**
 * 基础的 api 接口 axios 实例
 */
// const apiHttp = createAxios({
//   baseURL: `${apiPath}/api`,
// });
const apiHttp = (config: AxiosRequestConfig = {}) =>
  createAxios({
    baseURL: `${apiPath}/api`,
    ...config,
  });

export const request = apiHttp({});

export default apiHttp;
