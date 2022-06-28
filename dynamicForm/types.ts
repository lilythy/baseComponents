import { ParamType, AppType, AppMode } from './config';

/**
 * 参数配置
 */
export interface ParamConfig {
  /**
   * 参数类型
   */
  type: ParamType;
  /**
   * 是否必填
   */
  required: boolean;
  /**
   * 参数 key
   */
  name: string;
  /**
   * 参数描述
   */
  label: string;
  /**
   * 参数说明
   */
  description?: string;
  /**
   * 参数值
   */
  defaultValue?: string;
  /**
   * 字段分组
   */
  group?: string;
  /**
   * 子属性
   */
  subPropertys?: ParamConfig[];
  /**
   * 子字段显示条件, 字符串等式
   */
  showSubPropertyIf?: string;
  /**
   * 当前字段显示条件, 字符串等式
   */
  showIf?: string;
  /**
   * text,longtext， password,number类型才可能会有
   */
  min?: number;
  max?: number;
  /**
   * longtext 类型才会有
   */
  codeblock?: string;
  /**
   * 是否是数组格式, hostName 和 complex才可能有
   */
  arrayValue?: boolean;
  /**
   * option 类型才会有
   */
  options?: string[];
}

/**
 * 模式配置
 */
export interface ModeConfig {
  /**
   * 未配置（永远不会出现）
   */
  // none?: void;
  /**
   * 默认模式
   */
  default?: ParamConfig[];
  /**
   * 单节点模式
   */
  standalone?: ParamConfig[];
  /**
   * 主从模式
   */
  cluster?: ParamConfig[];
  /**
   * 外部提供模式
   */
  external?: ParamConfig[];
}

export interface FinalGroupConfig {
  [key: string]: ParamConfig[];
}

/**
 * 应用配置
 */
export interface AppConfig {
  /**
   * 应用ID
   */
  id: string;
  /**
   * 应用名称
   */
  name: string;
  /**
   * 应用版本
   */
  version: string;
  /**
   * 应用类型
   */
  type: AppType;
  /**
   * 应用模式
   */
  mode: AppMode;
  /**
   * 模式配置
   */
  propertyDefines: ModeConfig;
  /**
   * 应用配置数据
   */
  config: Record<string, unknown>;
  /**
   * 分类标签
   */
  tags: string[];
}

/**
 * 服务器配置
 */
export interface HostConfig {
  /**
   * 服务器ID
   */
  id: number;
  /**
   * 服务器主机
   */
  host: string;
  tags?: string[];
}

export interface OptionsItemProp {
  label: any;
  value: string | number;
}

export interface Obj {
  [key: string]: any;
}

export interface ArrayModalItem {
  visible: boolean;
  config: ParamConfig;
  record?: Obj;
}
