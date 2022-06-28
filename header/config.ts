export const STATUS = {
  /** 产品集安装导入 */
  PRODUCT_SET_INSTALL: 'productset-install',
  /** 服务器配置 */
  SERVER_CONFIG: 'server-configure',
  /** 部署配置 */
  DEPLOY_CONFIG: 'deployment-configure',
  /** 基础服务安装 */
  BASIC_SERVICE_INSTALL: 'basic-service-install',
  /** 数据库初始化 */
  DATABASE_INIT: 'data-init',
  /** License导入 */
  LICENSE: 'license-import',
  /** 平台服务安装 */
  PLATFORM_SERVICE_INSTALL: 'platform-service-install',
  /** 初始化完成 */
  INIT: 'initialized',
};

/** 路由映射到STATUS的key */
export const PATHNAME_TO_STATUS_KEY = {
  '/bootstrap/product': [STATUS.PRODUCT_SET_INSTALL],
  '/bootstrap/server': [STATUS.SERVER_CONFIG],
  '/bootstrap/deploy': [STATUS.DEPLOY_CONFIG],
  '/bootstrap/platformCompt': [STATUS.BASIC_SERVICE_INSTALL],
  '/bootstrap/database': [STATUS.DATABASE_INIT],
  '/bootstrap/license': [STATUS.LICENSE],
  '/bootstrap/bizApp': [STATUS.PLATFORM_SERVICE_INSTALL],
};

/** step对应的路由 */
export const STEP_TO_ROUTE_PATH = {
  '1': '/bootstrap/product',
  '2': '/bootstrap/server',
  '3': '/bootstrap/deploy',
  '4': '/bootstrap/platformCompt',
  '5': '/bootstrap/database',
  '6': '/bootstrap/license',
  '7': '/bootstrap/bizApp',
};

/** 状态对应页面 */
export const STATUS_STEP_KEY = {
  [STATUS.PRODUCT_SET_INSTALL]: 1, // 产品集安装导入
  [STATUS.SERVER_CONFIG]: 2, // 部署服务器配置
  [STATUS.DEPLOY_CONFIG]: 3, // 服务部署配置
  [STATUS.BASIC_SERVICE_INSTALL]: 4, // 基础服务安装
  [STATUS.DATABASE_INIT]: 5, // 数据库初始化
  [STATUS.LICENSE]: 6, // License导入
  [STATUS.PLATFORM_SERVICE_INSTALL]: 7, // 平台服务安装
  [STATUS.INIT]: 8, // 初装完成
};

// step的枚举
export const STEP_OPTIONS = [
  {
    name: '第一步-产品集',
    key: 1,
  },
  {
    name: '第二步-服务器',
    key: 2,
  },
  {
    name: '第三步-部署方案',
    key: 3,
  },
  {
    name: '第四步-平台组件',
    key: 4,
  },
  {
    name: '第五步-数据初始化',
    key: 5,
  },
  {
    name: '第六步-上传License',
    key: 6,
  },
  {
    name: '第七步-平台应用',
    key: 7,
  },
];
