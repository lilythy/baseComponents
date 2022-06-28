import React, { useEffect, useState, ReactNode } from 'react';
import { Modal, Alert, Input, message } from '@perfma/heaven';
import { getCodeV6 } from '@/utils';
import './index.less';

interface IProps {
  className?: string;
  visible: boolean;
  content: string | ReactNode;
  extra?: string | ReactNode;
  onOk: () => void;
  onCancel: () => void;
}

const DelModal = (props: IProps) => {
  const { className, visible, content, onCancel, onOk, extra } = props || {};
  const [code, setCode] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (visible) {
      setCode(getCodeV6());
    }
  }, [visible]);

  const inputChange = (e: any) => {
    const val = e?.target?.value;
    setText(val);
  };

  const handleOk = (e: any) => {
    e.stopPropagation();
    if (text.trim().toLowerCase() === code.toLowerCase()) {
      onOk && onOk();
      setTimeout(() => {
        onCancel && onCancel();
      }, 200);
    } else {
      message.warning('请填写正确的确认码！');
    }
  };

  const handleCancle = (e: any) => {
    e.stopPropagation();
    onCancel && onCancel();
  };

  return (
    <div>
      <Modal
        className={`del-modal ${className}`}
        visible={visible}
        onCancel={handleCancle}
        onOk={handleOk}
        destroyOnClose
        width={400}
      >
        <div>
          <Alert className="breakall mrbot12" message={content} banner />
          {extra && <div className="extra-text">{extra}</div>}
          <div className="content">确认码：{code}</div>
          <Input
            className="input"
            placeholder="请输入上方确认码"
            value={text}
            onChange={inputChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DelModal;
