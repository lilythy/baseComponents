import React, { useEffect, useState } from 'react';
import { Icon, Button, Input, Tag, Popover } from '@perfma/heaven';
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { FontIcon } from '@/components/commons';
import './index.less';

interface IProps {
  value?: any[];
  onChange?: any;
  max?: number;
}

const MulTags: React.FC<IProps> = ({ value, max = 3, onChange }) => {
  const [val, setVal] = useState(value || []);
  const [inputVal, setInputVal] = useState('');
  const [showBtn, setShowBtn] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVal(value || []);
  }, [value]);

  // 按下回车的回调
  const onPressEnter = () => {
    const newVal = inputVal ? [...val, inputVal] : [...val];
    if (inputVal) {
      setVal(newVal);
      onChange(newVal);
    }
    if (newVal?.length >= max) {
      setShowBtn(false);
    }
    setInputVal('');
  };

  // 删除
  const del = (event: any, name: string) => {
    event.stopPropagation();
    const idx = val.findIndex((item: string) => item === name);
    const cloneVal = [...val];
    cloneVal.splice(idx, 1);
    setVal(cloneVal);
    onChange(cloneVal);
    if (cloneVal?.length < max) {
      setShowBtn(true);
    }
  };

  const onInputChange = (e: any) => {
    const temptVal = e?.target?.value;
    setInputVal(temptVal);
  };

  return (
    <span>
      <span className="mt-10 mb-16">
        {(val?.length &&
          val.map((item: string) => (
            <span key={item} className="relative popover-tag-item">
              <Tag color="blue" maxLength={15}>
                {item}
              </Tag>
              <Icon
                type="CloseCircleFilled"
                className="multiple-tags-icon"
                onClick={(e: any) => del(e, item)}
              />
              {/* <FontIcon type="iconfont" iconClass="icon-guanbi" className="multiple-tags-icon" onClick={() => del(item)}/> */}
            </span>
          ))) ||
          null}
      </span>
      {showBtn && (
        <Popover
          visible={visible}
          trigger="click"
          placement="bottom"
          content={
            <div>
              <div>
                <div className="text-gray-400 mb-4">标签名称</div>
                <Input
                  className="mb-12"
                  placeholder="请输入，最长15个字符"
                  value={inputVal}
                  maxLength={15}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <Button type="primary" block onClick={onPressEnter}>
                  完成创建
                </Button>
              </div>
            </div>
          }
          title={
            <div className="flex items-center justify-between">
              <ArrowLeftOutlined
                className="popover-title-return-icon"
                onClick={() => setVisible(false)}
              />
              <span>创建标签</span>
              <span />
            </div>
          }
        >
          <Button
            className="popover-add-btn"
            type="text"
            icon={<Icon className="align-text-bottom" type="PlusOutlined" />}
            onClick={(event: any) => {
              event.stopPropagation();
              setVisible(true);
            }}
          >
            标签
          </Button>
        </Popover>
      )}
    </span>
  );
};

export default MulTags;
