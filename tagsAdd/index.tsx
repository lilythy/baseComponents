import React, { useEffect, useState } from 'react';
import { Icon, Button, Input, Tag } from '@perfma/heaven';
import { RollbackOutlined } from '@ant-design/icons';
// import { FontIcon } from '@/components/commons';
import './index.less';

interface IProps {
  value?: any[];
  onChange?: any;
  max?: number;
}

const MulTags: React.FC<IProps> = ({ value, max = 3, onChange }) => {
  const [val, setVal] = useState(value || []);
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    setVal(value || []);
  }, [value]);

  // 按下回车的回调
  const onPressEnter = (e: any) => {
    const currentVal = e?.target?.value;
    const newVal = currentVal ? [...val, currentVal] : [...val];
    if (currentVal) {
      setVal(newVal);
      onChange(newVal);
    }
    if (newVal?.length >= max) {
      setShowInput(false);
      setShowBtn(false);
    }
    setInputVal('');
  };

  // 删除
  const del = (name: string) => {
    const idx = val.findIndex((item: string) => item === name);
    const cloneVal = [...val];
    cloneVal.splice(idx, 1);
    setVal(cloneVal);
    onChange(cloneVal);
    if (cloneVal?.length < max) {
      setShowBtn(true);
    }
  };

  // 显示输入框
  const show = () => {
    setShowInput(true);
  };

  const onInputChange = (e: any) => {
    const temptVal = e?.target?.value;
    setInputVal(temptVal);
  };

  return (
    <div>
      <div>标签{max ? `(最多${max}个)` : ''}</div>
      <div className="mt-10 mb-16">
        {(val?.length &&
          val.map((item: string) => (
            <span key={item} className="relative">
              <Tag color="blue" maxLength={15}>
                {item}
              </Tag>
              <Icon
                type="CloseCircleFilled"
                className="multiple-tags-icon"
                onClick={() => del(item)}
              />
              {/* <FontIcon type="iconfont" iconClass="icon-guanbi" className="multiple-tags-icon" onClick={() => del(item)}/> */}
            </span>
          ))) ||
          null}
      </div>
      {showInput && (
        <Input
          className="mb-12"
          placeholder="请输入标签名称，最长15个字符，按回车保存"
          suffix={<RollbackOutlined />}
          value={inputVal}
          maxLength={15}
          onChange={onInputChange}
          onPressEnter={onPressEnter}
        />
      )}
      {showBtn && (
        <Button
          type="dashed"
          icon={<Icon className="align-baseline" type="PlusOutlined" />}
          onClick={show}
        >
          添加标签
        </Button>
      )}
    </div>
  );
};

export default MulTags;
