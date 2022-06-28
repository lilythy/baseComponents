import React, { ReactNode } from 'react';
import { List, Icon } from '@perfma/heaven';
// import { FontIcon } from '../commons';

interface IProps {
  value?: any[];
  onChange?: any;
  options?: any[]; // 可选区域的数量
  isSingleCheck?: boolean; // 单选/多选
  isRequired?: boolean; // 是否必选，必选的话，单选的情况下，不允许取消
  cols?: number;
  className?: string;
  renderChild?: (val: any) => ReactNode;
  disabled?: boolean;
}

const Checkbox: React.FC<IProps> = ({
  renderChild,
  options,
  className = '',
  value = [],
  cols = 3,
  onChange,
  isSingleCheck,
  isRequired,
  disabled,
}) => {
  const handleChange = (val: any) => {
    if (value?.includes(val)) {
      // 已经选择了
      if (isRequired) return; // 必填的情况下不允许取消

      // 选中/未选中 之间切换
      value = value.filter((code) => code !== val);
    } else if (isSingleCheck) {
      // 单选
      value = [val];
    } else {
      // 多选
      value.push(val);
    }

    onChange([...value]);
  };

  return (
    <List
      className={className}
      grid={{ gutter: 16, column: cols || 3 }}
      dataSource={options || []}
      renderItem={(item) => {
        const checked = value?.includes(item.value);
        return (
          <List.Item>
            <div
              onClick={() => {
                if (disabled) return;

                handleChange(item.value);
              }}
              className={`border border-bordergray2 relative rounded-sm transition-all ${
                checked ? 'border-blue2' : ''
              } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* 钩 */}
              <div
                className={`absolute w-0 h-0 right-0 top-0 border-r-32 border-b-32 transition-opacity ${
                  checked ? 'opacity-100' : 'opacity-0 '
                }`}
                style={{
                  borderColor: 'transparent #008AFF',
                }}
              >
                {/* <FontIcon
                  type="iconfont"
                  iconClass="icon-dagou"
                  className="text-white ml-16 mt-2"
                /> */}
                <Icon type="Check" className="text-white ml-16 mt-2" />
              </div>
              {renderChild && renderChild(item)}
            </div>
          </List.Item>
        );
      }}
    />
    // <div
    //   className={`grid grid-cols-${cols || 3} gap-12 select-none ${className}`}
    // >
    //   {options?.map((item, index) => {
    //     const checked = value?.includes(item.value);

    //     return (
    //       <div
    //         key={index}
    //         onClick={() => {
    //           if (disabled) return;

    //           handleChange(item.value);
    //         }}
    //         className={`border border-bordergray2 relative rounded-sm transition-all ${
    //           checked ? 'border-blue2' : ''
    //         } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    //       >
    //         {/* 钩 */}
    //         <div
    //           className={`absolute w-0 h-0 right-0 top-0 border-r-32 border-b-32 transition-opacity ${
    //             checked ? 'opacity-100' : 'opacity-0 '
    //           }`}
    //           style={{
    //             borderColor: 'transparent #008AFF',
    //           }}
    //         >
    //           <Icon
    //             type="iconfont"
    //             iconClass="icon-dagou"
    //             className="text-white ml-16 mt-2"
    //           />
    //         </div>
    //         {renderChild && renderChild(item)}
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default Checkbox;
