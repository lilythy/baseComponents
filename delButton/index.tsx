import React, { ReactNode, useState } from 'react';
import { Button } from '@perfma/heaven';
import DeleteModal from '../deleteModal';

interface IProps {
  className?: string;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  content?: string | ReactNode;
  extra?: string | ReactNode;
  children?: string | ReactNode;
  icon?: any;
}

const DelButton: React.FC<IProps> = ({
  className = '',
  type,
  loading,
  disabled,
  onClick = () => {},
  content = '',
  extra,
  children,
  icon = null,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Button
      className={className}
      onClick={handleClick}
      disabled={disabled || loading}
      loading={loading}
      type={type}
      icon={icon}
    >
      {children}
      {(visible && (
        <DeleteModal
          visible={visible}
          content={content}
          onOk={onClick}
          onCancel={closeModal}
          extra={extra}
        />
      )) ||
        null}
    </Button>
  );
};

export default DelButton;
