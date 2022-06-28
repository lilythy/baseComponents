/*
 * @Author: yewei
 * @Date: 2022-02-10 17:30:26
 * @Last Modified by: yewei
 * @Last Modified time: 2022-03-18 20:19:44
 *
 * recoil 管理状态
 */

import { atom } from 'recoil';

interface IAppConfig {
  description: string;
  docUrl: string;
  id: string;
  imgUrl: string;
  logoUrl: string;
  rootUrl: string;
  serviceName: string;
  serviceNameEn: string;
  serviceOrder: 0;
  serviceType: string;
  showStatus: true;
  skipUrl: string;
}

export interface IEnvItem {
  id: string;
  code: string;
  baseUrl: string;
  loginHost: string;
  originConfig: {
    private_switch: boolean;
    saas: IAppConfig[];
    paas: IAppConfig;
  };
  changeAuth: (status: boolean) => void;
  customChangeEnv: (id: string, code: string) => void;
  logout: () => void;
  showEnvCallback: (status: boolean) => void;
  updateConfig: () => void;
  updateUserInfo: () => void;
}

export interface IUserInfo {
  username?: string;
}

export interface ISystemInfo {
  state?: string;
  version?: string;
}

export interface IMenuState {
  path?: string;
}

// 当前环境上下文
const currentSystemState = atom<ISystemInfo>({
  key: 'currentSystemState',
  default: {},
});

const globalUserState = atom<IUserInfo>({
  key: 'globalUserState',
  default: {},
});

const currentMenuState = atom<IMenuState>({
  key: 'currentMenuState',
  default: {},
});

export { currentSystemState, globalUserState, currentMenuState };
