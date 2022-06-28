import { isEqual } from "lodash-es";
import React from "react";
import { withRouter, RouteComponentProps, useLocation } from "react-router-dom";
import { parseQuery, stringifyQuery } from "@/utils";
import BaseTable from "../BaseTable";

type Params = {
  pageNum: number;
  pageSize: number;
};

type Data = {
  pageNum: number;
  pageSize: number;
  total: number;
  list: any[];
};

type Props = {
  [key: string]: any;
  fetchParams?: Record<string, any>;
  fetchData: (params: Params) => Promise<Data>;
  onChange?: (...rest: any[]) => void | boolean;
} & RouteComponentProps;

const DFT_SIZE = 20;
const PAGE_KEY = "pageNum";
const SIZE_KEY = "pageSize";
const FILTER_KEY = "filter";

class FetchTable extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      total: 0,
      current: 1,
      pageSize: DFT_SIZE,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.queryData({});
  }

  componentDidUpdate(prevProps: any) {
    // console.log("componentDidUpdate", prevProps);
    const { fetchParams: currFetchParams, location: currLocation } = this.props;
    const { fetchParams: prevFetchParams, location: prevLocation } = prevProps;
    // 筛选条件变更，保存至路由
    if (!isEqual(currFetchParams, prevFetchParams)) {
      this.updateSearch({
        [FILTER_KEY]: currFetchParams,
        [PAGE_KEY]: 1, // 重置分页
      });
      return;
    }

    // 路由查询参数变更，触发查询数据
    const currQuery = parseQuery(currLocation.search);
    const prevQuery = parseQuery(prevLocation.search);
    if (!isEqual(currQuery, prevQuery)) {
      this.queryData({});
    }
  }

  // 更新路由查询参数
  private updateSearch = (query: any) => {
    // console.log("updateSearch", query);
    const { history, location } = this.props;
    const prev = parseQuery(location.search);
    const _query = Object.assign({}, prev, query);

    history.push({
      ...location,
      search: stringifyQuery(_query),
    });
  };

  // 查询分页数据
  private queryData = async (values: any) => {
    const { location, fetchData } = this.props;
    // 解析路由查询参数
    const query = parseQuery(location.search);
    const params = {
      pageNum: query[PAGE_KEY] || 1,
      pageSize: query[SIZE_KEY] || DFT_SIZE,
      ...(query[FILTER_KEY] || this.props.fetchParams),
      ...values,
    };

    // console.log("queryData 1", params);

    this.setState({
      loading: true,
    });

    try {
      const resp = (await fetchData(params)) || {};
      // const { total, page, size, list } = await fetchData(params);
      // console.log("queryData 2", total, page, size, list);

      this.setState({
        total: resp.total || 0,
        current: resp.pageNum || 1,
        pageSize: resp.pageSize || DFT_SIZE,
        dataSource: resp.list || [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  // 分页参数变更
  private handleChange = (pagination: any, ...rest: any[]) => {
    // console.log("handleChange", pagination, ...rest);
    const { onChange } = this.props;
    const { current, pageSize } = pagination;
    // this.queryData({ pageSize, pageNum: current });
    // 触发外部事件
    const ignore = onChange && onChange(pagination, ...rest);
    if (ignore) {
      return;
    }

    // 将分页参数保存至路由
    // const { current, pageSize } = pagination || {};
    this.updateSearch({
      [PAGE_KEY]: current,
      [SIZE_KEY]: pageSize,
    });
  };

  render() {
    const { fetchParams, fetchData, onChange, pagination, ...rest } =
      this.props;
    const { loading, total, current, pageSize, dataSource } = this.state;

    return (
      <BaseTable
        loading={loading}
        dataSource={dataSource}
        pagination={{ total, current, pageSize, ...pagination }}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
}

export default withRouter(FetchTable);

/**
 * 从路由查询参数中获取筛选条件
 */
export const useSearchFilterValue = () => {
  const location = useLocation();
  const query = parseQuery(location.search);
  return query[FILTER_KEY];
};
