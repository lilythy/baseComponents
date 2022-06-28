/* eslint-disable no-unused-vars */

/* eslint-disable no-mixed-operators */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unused-vars */
// import { branches } from "@/api/iteration";
// import { PageParam } from "@/common/enums/frontEnums";
import BaseSelect from '../BaseSelect';
import { useState, useEffect, useRef } from 'react';

const FetchSelect = (props: any) => {
  const {
    data = [],
    auto = true,
    api,
    params = {},
    target = 'data',
    labelName = 'name',
    valueName = 'id',
    keyword = 'name',
    disableds = [],
    actypes = [], // 过滤projectType类型
    acids = null, // 过滤只能筛选的id
    pid,
    pidname,
    value,
    onChange,
    ...rest
  } = props || {};
  const [list, setList] = useState([]);
  const listRef = useRef([]);

  const fetchData = async (searchWord: any) => {
    const param = searchWord
      ? pidname
        ? { ...params, [keyword]: searchWord, [pidname]: pid }
        : { ...params, [keyword]: searchWord }
      : pidname
      ? { ...params, [pidname]: pid }
      : { ...params };
      
    const rsp = await api(param);
    return rsp;
  };

  useEffect(() => {
    if (auto) {
      handleGetData(null);
    }
  }, []);

  useEffect(() => {
    if (data && data.length) {
      listRef.current = data;
      setTimeout(() => setList(data), 0);
    }
  }, [data]);

  useEffect(() => {
    if (pid) {
      handleGetData(null);
    }
  }, [pid]);

  useEffect(() => {
    if (disableds?.length) {
      const disList: any =
        (listRef.current?.length &&
          listRef.current.map((item: any) =>
            typeof item === 'object'
              ? { ...item, disabled: disableds.includes(item[valueName]) }
              : { name: item, id: item, disabled: disableds.includes(item) },
          )) ||
        [];
      listRef.current = disList;
      setList(disList);
    }
  }, [disableds]);

  useEffect(() => {
    if (actypes.length) {
      const dataList =
        (listRef.current?.length &&
          listRef.current.filter((item: any) =>
            actypes.includes(item?.projectType),
          )) ||
        [];
      listRef.current = dataList;
      setList(dataList);
    }
  }, [actypes]);

  useEffect(() => {
    if (acids && acids.length) {
      const dataList =
        (listRef.current?.length &&
          listRef.current.filter((item: any) => acids.includes(item?.id))) ||
        [];
      listRef.current = dataList;
      setList(dataList);
    }
  }, [acids]);

  const handleGetData = (keyword: any) => {
    fetchData(keyword)
      .then((res: any) => {
        if (!res.success) {
          listRef.current = [];
          setList([]);
          return null;
        }
        let targetList = target === 'items' ? res.data.items : res.data || [];
        if (actypes?.length) {
          targetList = targetList.filter((item: any) =>
            actypes.includes(item?.projectType),
          );
        }
        if (acids && acids?.length) {
          targetList = targetList.filter((item: any) =>
            acids.includes(item?.id),
          );
        }
        listRef.current = targetList;
        setList(targetList);
      })
      .catch((err) => {
        setList([]);
      });
  };

  const handleSearch = (value: string, rest: any) => {
    // 远程查询
    handleGetData(value);
  };

  const handleChange = (value: any, option: any) => {
    if (!value && !pidname) {
      handleGetData(value);
    }
    onChange && onChange(value, option);
  };

  const options =
    (listRef.current?.length &&
      listRef.current.map((item: any) => ({
        key: typeof item === 'object' ? item[valueName] : item,
        value: typeof item === 'object' ? item[valueName] : item,
        text:
          typeof item === 'object'
            ? typeof labelName === 'function'
              ? labelName(item)
              : item[labelName]
            : item,
        disabled:
          typeof item === 'object'
            ? disableds.includes(item[valueName])
            : false,
      }))) ||
    [];

  return (
    <BaseSelect
      showSearch
      placeholder="请选择"
      filterOption={false}
      onSearch={handleSearch}
      options={options}
      value={value}
      onChange={handleChange}
      pidname={pidname}
      {...rest}
    />
  );
};

export default FetchSelect;
