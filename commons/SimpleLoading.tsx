/*
 * @Author: yewei
 * @Date: 2021-12-15 14:06:15
 * @Last Modified by: yewei
 * @Last Modified time: 2021-12-23 19:15:12
 *
 * 简易 loading，常用于内容加载时的 loading
 */
import { Loading } from '@perfma/heaven';
import React from 'react';

const SimpleLoading: React.FC<{ loading?: boolean }> = ({
  loading,
  children,
}) =>
  children ? (
    <Loading.Simple loading={loading} time={1000}>
      {children}
    </Loading.Simple>
  ) : (
    <div className="mt-40 w-full flex justify-center">
      <Loading.Simple loading time={1000} />
    </div>
  );

export default SimpleLoading;
