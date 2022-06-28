import React from 'react';
import { Badge, Icon } from '@perfma/heaven';
import './index.less';

interface IProps {
  className?: string;
  status?: 'default' | 'loading' | 'success' | 'error' | 'warning' | string;
  value?: string;
}

const TextLog: React.FC<IProps> = ({
  className = '',
  status = 'default',
  value = '',
}) =>
  status !== 'loading' ? (
    <Badge className={`${className}`} status={status} text={value} />
  ) : (
    <Badge
      className={`badge-no-status ${className}`}
      status="default"
      text={
        <span className="inline-flex items-baseline">
          <Icon type="Loading" spin />
          <span className="ml-6">{value}</span>
        </span>
      }
    />
  );

export default TextLog;
