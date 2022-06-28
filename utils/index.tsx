/* eslint-disable guard-for-in */
/* eslint-disable no-lonely-if */
import { AppInfoList } from '@/pages/components/bootstrapList/types';
import { AppConfig } from '@/pages/bootstrap/deploy/types';
import { APP_TAB_KEY, LICENSE_SERVER, APP_TAGS } from '@/constants/common';

/**
 * 类型检查
 */
export const isType = (val: any, type: string): boolean =>
  Object.prototype.toString.call(val) === `[object ${type}]`;

export const cookieMap = () => {
  const map = new Map();
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');

    map.set(key, value);
  }

  return map;
};

const returnResult = (data, pattern) => {
  let result: string;
  // 有三种状态，初始default，正确success，错误warning
  if (data === '') {
    result = 'default';
  } else {
    result = pattern.test(data) ? 'success' : 'warning';
  }
  return result;
};

// eslint-disable-next-line import/prefer-default-export
export const checkRegisterName = (data: string) => {
  // 8-30个字符，首字符为字母，仅限数字、字母、_和-
  const pattern = /^[a-zA-Z][-_a-zA-Z0-9]{7,29}$/;
  const result = returnResult(data, pattern);
  return result;
};

// 8-50个字符，密码不可跟用户相同
export const checkUsernameAndPassword = (data, name) => {
  if (data === '') return 'default';
  if (data !== name && data.length < 50 && data.length > 8) {
    return 'success';
  }
  return 'warning';
};

// 仅限字母和数字
export const numAndLetter = (data: string) => {
  const pattern = /^[0-9a-zA-Z]*$/;
  const result = returnResult(data, pattern);
  return result;
};

// 必须包含大小写字母、数字
export const hasNumLetter = (data: string) => {
  const pattern = /^.*(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/;
  const result = returnResult(data, pattern);
  return result;
};

// 检查两次密码输入是否相同
export const checkPasswordRight = (data: string, passWord: string) => {
  if (data === '') return 'default';
  if (data === passWord) {
    return 'success';
  }
  return 'warning';
};

// 常见手机号校验规则
export const checkPhone = (data: string) => {
  //   const pattern = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  const pattern = /^1\d{10}$/;
  const result = returnResult(data, pattern);
  return result;
};

/**
 * 反序列化查询字符串
 */
export const parseQuery = (search: string) => {
  const obj: Record<string, any> = {};

  if (search) {
    const str = search.replace(/^\?+/, '');
    const arr = str.split('&');

    arr.forEach((item) => {
      if (item !== undefined) {
        const [key, val] = item.split('=');

        // 尝试 JSON 反序列化
        const _key = decodeURIComponent(key);
        let _val = decodeURIComponent(val);
        try {
          _val = JSON.parse(_val);
        } catch (error) {
          // console.warn(error);
        }

        obj[_key] = _val;
      }
    });
  }

  return obj;
};

const getRandom = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

// 生成6位数字、大小写字母随机码
export const getCodeV6 = () => {
  let code = '';
  for (let i = 0; i < 6; i++) {
    const type = getRandom(1, 3);
    switch (type) {
      case 1:
        code += String.fromCharCode(getRandom(48, 57)); // 数字
        break;
      case 2:
        code += String.fromCharCode(getRandom(65, 90)); // 大写字母
        break;
      case 3:
        code += String.fromCharCode(getRandom(97, 122)); // 小写字母
        break;
      default:
      //
    }
  }
  return code;
};

// 深拷贝
export const deepCopy = (data) => {
  if (typeof data !== 'object' || data === null) {
    throw new TypeError('传入参数不是对象');
  }
  const newData = {};
  const dataKeys = Object.keys(data);
  dataKeys.forEach((value) => {
    const currentDataValue = data[value];
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== 'object' || currentDataValue === null) {
      newData[value] = currentDataValue;
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue];
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue]);
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue]);
    } else {
      // 普通对象则递归赋值
      newData[value] = deepCopy(currentDataValue);
    }
  });
  return newData;
};

// 判断arr1数组是否包含arr2数组的任意元素，返回true/false
export const has = (arr1: string[], arr2: string[]) => {
  let found = false;
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) > -1) {
      found = true;
      break;
    }
  }
  return found;
};

/** 过滤数据，结合filterType 和  tabKey 筛选 */
export const filterAppData = (
  sourceData: AppInfoList[] | AppConfig[] | any[],
  tKey: string,
  fType: string,
): AppInfoList[] => {
  const res = [];
  for (let i = 0; i < sourceData.length; i++) {
    if (fType === 'component') {
      if (tKey === APP_TAB_KEY.COMPONENT) {
        sourceData[i].tags.includes(APP_TAGS.COMPONENT) &&
          res.push(sourceData[i]);
      } else {
        sourceData[i].name === LICENSE_SERVER && res.push(sourceData[i]);
      }
    } else if (fType === 'app') {
      if (tKey === APP_TAB_KEY.SERVICE) {
        sourceData[i].tags.includes(APP_TAGS.SERVICE) &&
          sourceData[i].name !== LICENSE_SERVER &&
          res.push(sourceData[i]);
      } else if (tKey === APP_TAB_KEY.UI) {
        sourceData[i].tags.includes(APP_TAGS.UI) && res.push(sourceData[i]);
      } else if (tKey === APP_TAB_KEY.FLINK) {
        sourceData[i].tags.includes(APP_TAGS.FLINK) && res.push(sourceData[i]);
      }
    } else if (fType === 'deploy') {
      if (tKey === APP_TAB_KEY.SERVICE) {
        sourceData[i].tags.includes(APP_TAGS.SERVICE) &&
          sourceData[i].name !== LICENSE_SERVER &&
          res.push(sourceData[i]);
      } else if (tKey === APP_TAB_KEY.FLINK) {
        sourceData[i].tags.includes(APP_TAGS.FLINK) && res.push(sourceData[i]);
      } else if (tKey === APP_TAB_KEY.COMPONENT) {
        sourceData[i].tags.includes(APP_TAGS.COMPONENT) &&
          res.push(sourceData[i]);
      }
    }
  }
  return res;
};

/** 将数组（array）转换为N组数组
 * sourceArray 原数组
 * size 组数
 */
export function splitter(sourceArray: any[], size: number): Array<any> {
  const list: any[] = [];
  const itemCount = Math.ceil(sourceArray.length / size);
  let current = 0;
  for (let i = 0; i < sourceArray.length; i++) {
    list[current] = list[current] || [];
    if (list[current].length === itemCount) {
      current++;
    }
    list[current] = list[current] || [];
    list[current].push(sourceArray[i]);
  }
  return list;
}

interface Obj {
  [key: string]: any;
}
/**
 * 将json数据扁平化，对象数组除外，对象数组每项加上唯一的key
 */
export const flatten = (obj: Obj) => {
  const result: Obj = {};
  const isEmpty = (x: Obj) => Object.keys(x).length === 0;
  const recurse = (cur: any, prop: string) => {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      const length = cur?.length;
      if (length === 0) {
        result[prop] = [];
      } else {
        if (typeof cur[0] !== 'object') {
          result[prop] = cur;
        } else {
          for (let i = 0; i < length; i++) {
            cur[i] = { ...cur[i], key: getCodeV6() };
            // recurse(cur[i], `${prop}[${i}]`);
          }
          result[prop] = cur;
        }
      }
    } else {
      if (!isEmpty(cur)) {
        Object.keys(cur).forEach((key) =>
          recurse(cur[key], prop ? `${prop}.${key}` : key),
        );
      } else {
        result[prop] = {};
      }
    }
  };
  recurse(obj, '');
  return result;
};

/**
 * 将扁平化的JSON 数据转换为非扁平化的
 */
export const unflatten = (obj: Obj) => {
  const props = Object.keys(obj);
  const regex = /\.?([^.[\]]+)$|\[(\d+)\]$/;
  let result;
  let p;

  // eslint-disable-next-line no-cond-assign
  while ((p = props.shift())) {
    const match = regex.exec(p);
    let target;
    if (match.index) {
      const rest = p.slice(0, match.index);
      if (!(rest in obj)) {
        obj[rest] = match[2] ? [] : {};
        props.push(rest);
      }
      target = obj[rest];
    } else {
      if (!result) {
        result = match[2] ? [] : {};
      }
      target = result;
    }
    target[match[2] || match[1]] = obj[p];
  }
  return result;
};

// 将字符串转换成0-8的数字
export const strTo8Num = (str: string) => {
  if (!str || !str?.length) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return sum % 8;
};

/**
 * 序列化查询对象
 */
export const stringifyQuery = (query: Record<string, any>) => {
  const list: string[] = [];

  if (query) {
    for (const key in query) {
      const val = query[key];

      // 字符串类型原样显示，其他类型 JSON 序列化
      let _val = val;
      if (!isType(val, 'String')) {
        try {
          _val = JSON.stringify(val);
        } catch (error) {
          // console.warn(error);
        }
      }

      const _key = encodeURIComponent(key);
      _val = encodeURIComponent(_val);

      list.push(`${_key}=${_val}`);
    }
  }

  return `?${list.join('&')}`;
};
