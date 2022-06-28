import React, { useEffect, useRef } from 'react';
import { Typography, Icon } from '@perfma/heaven';
import './index.less';

const { Paragraph } = Typography;

interface IProps {
  className?: string;
  value?: string;
}

const TextLog: React.FC<IProps> = ({ className = '', value = '' }) => {
  const [ellipsis, setEllipsis] = React.useState(true);
  const [showBtn, setShowBtn] = React.useState(false);
  const textLogRef = useRef(null);

  useEffect(() => {
    const height = parseInt(getComputedStyle(textLogRef.current).height, 10);
    const lineHeight = parseInt(
      getComputedStyle(textLogRef.current).lineHeight,
      10,
    );
    if (height > lineHeight * 3) {
      setShowBtn(true);
    }
  }, []);

  const handleChange = () => {
    setEllipsis(!ellipsis);
  };

  return (
    <div className={`flex items-baseline ${className}`} ref={textLogRef}>
      {showBtn && (
        <Icon
          className="icon-expand-color"
          type="DownOutlined"
          rotate={ellipsis ? 0 : 180}
          onClick={handleChange}
        />
      )}
      <Paragraph
        className={showBtn && ellipsis ? 'multi-row' : ''}
        // ellipsis={
        //   ellipsis ? { rows } : false
        // }
      >
        {value}
      </Paragraph>
    </div>
  );
};

export default TextLog;
