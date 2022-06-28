import React from 'react';
import { ArrowDownOutlined } from '@ant-design/icons';

interface IProps {
  className?: string;
  href?: string;
  children?: any;
}

const TextLog: React.FC<IProps> = ({
  className = '',
  href = '',
  children = null,
}) => {
  const handleDownload = () => {
    // 接口会直接发起下载
    window.location.href = href;
  };

  return (
    <a className={`${className}`} href={href} onClick={handleDownload}>
      {children || <ArrowDownOutlined />}
    </a>
  );
};

export default TextLog;
