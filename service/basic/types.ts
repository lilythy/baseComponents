export interface IApiResponse<T = any, K = any> {
  success: boolean; // 业务是否成功
  code: string; // 结果码。仅作为 success 字段不足以区分不同结果时的补充；可为 null，取值需要先定义字典
  message: string; // success 为 false 的情况下不为空
  object: T; // 业务数据，可能为空或没有该字段
  extParams: K; // 扩展返回值，object 字段不满足需求时作为补充，内部数据项可为 null
  data?: any;
  items?: any;
}

export interface ITableRequest {
  pageNumber: number;
  pageSize: number;
}

export interface ITable<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: string;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean; // 是否是最后一页
  totalPages: number; // 总页数
  totalElements: number; // 总数据条数
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean; // 是否是第一页
  numberOfElements: number; // 当前页数据条数
  size: number; // 每页大小
  number: number; // 当前页
  empty: boolean; // 是否有数据
}
