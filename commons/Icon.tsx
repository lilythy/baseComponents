import React from 'react';
import { Icon as AntdIcon, Tooltip } from '@perfma/heaven';

interface IICon extends React.HTMLAttributes<HTMLDivElement> {
  type: 'antd' | 'iconfont';
  /** 均是字符串类型 */
  iconClass: any;
  tooltip?: string;
  className?: string;
  size?: number;
  onClick?: () => void;
}

const Icon: React.FC<IICon> = ({
  iconClass,
  type,
  tooltip,
  className = '',
  size = 14,
  onClick = () => {},
}) => {
  let component = null;

  if (type === 'iconfont') {
    component = (
      <svg
        className={`icon ${className}`}
        aria-hidden="true"
        style={{ fontSize: `${size}px` }}
        onClick={onClick}
      >
        <use xlinkHref={`#${iconClass}`} />
      </svg>
    );
  } else {
    component = (
      <AntdIcon type={iconClass} className={className} onClick={onClick} />
    );
  }

  if (tooltip) {
    return <Tooltip title={tooltip}>{component}</Tooltip>;
  }

  return component;
};

export default Icon;
