/* eslint-disable no-nested-ternary */
import React, { ReactNode, useEffect, useState } from 'react';
import { Modal, Alert } from '@perfma/heaven';
import './index.less';

interface IProps {
  className?: string;
  visible: boolean;
  title: string;
  content?: string | ReactNode;
  info?: string | ReactNode;
  width?: string | number;
  onCancel: () => void;
  children?: string | ReactNode;
  formNode?: ReactNode;
}

const LogView: React.FC<IProps> = ({
  className = '',
  visible,
  title,
  content = '',
  onCancel = () => {},
  info = '',
  width,
  children,
  formNode = null,
}) => {
  const [value, setValue] = useState<any>('');

  useEffect(() => {
    if (typeof content === 'string') {
      const items = content.split(/\r?\n/) || [];
      const finalContent = items.map((item: any) => (
        <div
          key={item}
          className={
            item?.indexOf('DEBUG') > -1
              ? 'log-DEBUG'
              : item?.indexOf('WARN') > -1
              ? 'log-WARN'
              : item?.indexOf('ERROR') > -1
              ? 'log-ERROR'
              : 'log-INFO'
          }
        >
          {item}
        </div>
      ));
      setValue(finalContent);
    }
  }, [content]);

  return (
    <Modal
      className={`log-modal ${className}`}
      visible={visible}
      onCancel={onCancel}
      title={title}
      width={width || '98%'}
      footer={null}
    >
      {formNode}
      {info && <Alert message={info} type="info" show-icon className="info" />}
      <div className="log-modal-content">
        {typeof content === 'string' ? value : content || children}
      </div>
    </Modal>
  );
};

export default LogView;
