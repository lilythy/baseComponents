/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, Drawer } from '@perfma/heaven';
import { AppConfig } from '../dynamicForm/types';
import DynamicForm from '../dynamicForm';
// import { IApiResponse } from '@/services/basic/types';
import './index.less';

interface IProps {
  className?: string;
  visible: boolean;
  onCancle: () => void;
  appConfig: AppConfig;
  refresh?: () => void;
  submitApi?: any;
}
const Config: React.FC<IProps> = ({
  className = '',
  visible = false,
  onCancle,
  appConfig,
  refresh,
  submitApi,
}) => {
  const handleRefresh = () => {
    refresh && refresh();
    onCancle && onCancle();
  };

  return appConfig?.name !== 'flink' ? (
    <Modal
      className={`${className} dynamic-form-modal`}
      title={appConfig?.name || '编辑'}
      visible={visible}
      onCancel={onCancle}
      footer={false}
    >
      <DynamicForm
        formType="modal"
        appConfig={appConfig}
        refresh={handleRefresh}
        submitApi={submitApi}
        onCancle={onCancle}
      />
    </Modal>
  ) : (
    <Drawer
      className={`${className} dynamic-form-modal`}
      title={appConfig?.name || '编辑'}
      placement="right"
      closable={false}
      onClose={onCancle}
      visible={visible}
      footer={false}
    >
      <DynamicForm
        formType="modal"
        appConfig={appConfig}
        refresh={handleRefresh}
        submitApi={submitApi}
        onCancle={onCancle}
      />
    </Drawer>
  );
};

export default Config;
