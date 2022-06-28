/* eslint-disable no-nested-ternary */
import React from 'react';
import { useRecoilValue } from 'recoil';
import Step from '@/pages/components/step';
import { currentMenuState, currentSystemState } from '@/models/index';
import {
  STATUS_STEP_KEY,
  STEP_OPTIONS,
  PATHNAME_TO_STATUS_KEY,
} from './config';
import { Item } from '@/pages/components/step/types';
import './index.less';

const BootstrapHeader: React.FC = () => {
  const { path } = useRecoilValue(currentMenuState);
  const { state } = useRecoilValue(currentSystemState);
  const stateKey = STATUS_STEP_KEY[PATHNAME_TO_STATUS_KEY[path]];
  const sysKey = STATUS_STEP_KEY[state];
  const finalStepOptions = STEP_OPTIONS.map((item: Item) => ({
    ...item,
    state:
      item.key < stateKey ? 'done' : item.key === stateKey ? 'current' : 'undo',
    valid: item.key <= sysKey,
  }));
  return (
    <div className="bootstrap-header">
      <Step className="bootstrap-header-step" data={finalStepOptions} />
    </div>
  );
};

export default BootstrapHeader;
