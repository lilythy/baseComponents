export const BaseGroupName = 'base';
/**
 * 服务器状态
 */
export enum HostStatus {
  /**
   * 未配置
   */
  none = 'none',
  /**
   * 初始化中
   */
  initializing = 'initializing',
  /**
   * 已初始化
   */
  initialized = 'initialized',
  /**
   * 初始化失败
   */
  initializeFailed = 'initialize-failed',
}

/**
 * 应用类型
 */
export enum AppType {
  /**
   * 中间件
   */
  middleware = 'middleware',
  /**
   * 后端
   */
  java = 'java',
  /**
   * 前端
   */
  ui = 'ui',
  /**
   * Flink
   */
  flink = 'flink-job',
}

/**
 * 应用模式
 */
export enum AppMode {
  /**
   * 未配置
   */
  none = 'none',
  /**
   * 默认模式
   */
  default = 'default',
  /**
   * 单节点模式
   */
  standalone = 'standalone',
  /**
   * 主从模式
   */
  cluster = 'cluster',
  /**
   * 外部提供
   */
  external = 'external',
}

/**
 * 参数类型
 */
export enum ParamType {
  /**
   * 文本类型, min,max最小最大长度可选配置
   */
  text = 'text',
  /**
   * 长文本类型，min,max最小最大长度可选配置， codeblock: string内容格式可选配置
   */
  longtext = 'longtext',
  /**
   * 密码文本类型， min, max最小最大长度可选配置
   */
  password = 'password',
  /**
   * select 选择框类型， 枚举值为options: string[]
   */
  option = 'option',

  /**
   * 数值类型, min， max最小最大值可选配置
   */
  number = 'number',
  /**
   * 布尔类型
   */
  bool = 'bool',
  /**
   * 服务器， arrayValue: boolean 是否多选 可选配置
   */
  hostname = 'hostname',
  /**
   * 复合类型，包括对象 和 对象数组
   * arrayValue 为false，平铺展开子属性；arrayValue为true，渲染成table展示子属性，且可以增加行
   */
  complex = 'complex',
}
