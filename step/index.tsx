/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.less';
import { useRecoilState } from 'recoil';
import { Item, Iprops } from './types';
import { STEP_TO_ROUTE_PATH } from '@/pages/bootstrap/common/header/config';
import { currentMenuState } from '@/models';

const Config: React.FC<Iprops> = (props: Iprops) => {
  const navigate = useNavigate();
  const { className, data = [] } = props;
  const [menuState, setMenuState] = useRecoilState(currentMenuState);

  // 点击跳转到对应步骤
  const handleClick = (key: number) => {
    setMenuState({ path: STEP_TO_ROUTE_PATH[`${key}`] });
    navigate(STEP_TO_ROUTE_PATH[`${key}`]);
  };

  return (
    <div className={`flow-charts ${className}`}>
      {data.map((item: Item, idx: number) => (
        <div
          key={item?.key || idx}
          className={`flow-charts-single flow-charts-single-${
            item?.state === 'current'
              ? 'current'
              : item?.valid
              ? 'done'
              : item?.state
          } cursor-${item.valid}`}
          onClick={item?.valid ? () => handleClick(item?.key) : () => {}}
        >
          <span>{item?.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Config;
