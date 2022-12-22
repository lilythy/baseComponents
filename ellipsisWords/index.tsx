import { Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

const computeStyle = (elem, prop) => {
  return window.getComputedStyle(elem, null).getPropertyValue(prop);
};

const getLineHeight = (elem) => {
  let lh: any = computeStyle(elem, 'line-height');
  if (lh == 'normal') {
    // Normal line heights vary from browser to browser. The spec recommends
    // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
    lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
  }
  return parseInt(lh);
};

const baseStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

const EllipsisWords = (props) => {
  const { rows = 2, children, tooltip } = props;
  const myRef: any = useRef();
  const [isNeedTooltip, setIsNeedTooltip] = useState(false);
  const node = children || tooltip;

  useEffect(() => {
    if (myRef.current) {
      const ele: any = myRef.current;
      const lineHight = getLineHeight(ele);
      const maxHeight = lineHight * rows;
      console.log('mount ref', lineHight, ele.clientHeight, maxHeight);
      if (maxHeight < ele.clientHeight) {
        setIsNeedTooltip(true);
      }
    }
  }, [myRef.current]);

  return isNeedTooltip ? (
    <Tooltip title={tooltip}>
      {/* @ts-ignore */}
      <div style={{ ...baseStyle, WebkitLineClamp: rows }}>{node}</div>
    </Tooltip>
  ) : (
    <div ref={myRef}>{node}</div>
  );
};

export default EllipsisWords;
