/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  Switch,
  Button,
} from '@perfma/heaven';
import { FontIcon } from '@/components/commons';
import { ParamConfig, OptionsItemProp } from './types';
import { ParamType } from './config';
import CodeEditor from '@/components/code';
import CodeEditorModal from './codeEditorModal';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// const { TextArea } = Input;

interface IProps {
  mode: string;
  config: ParamConfig;
  hostList: OptionsItemProp[];
  onValuesChange?: () => void;
}
const DynamicItem: React.FC<IProps> = ({
  mode = 'default',
  config = null,
  hostList = [],
  onValuesChange,
}) => {
  const [visible, setVisible] = useState(false);

  const showCodeModal = () => {
    setVisible(true);
  };

  const cancleCodeModal = () => {
    setVisible(false);
  };

  if (!config) {
    return null;
  }
  const {
    type,
    name,
    label,
    required,
    description,
    defaultValue,
    // group,
    // subPropertys,
    min,
    max,
    codeblock,
    // arrayValue,
    options,
  } = config;
  const key = `${mode}-${type}-${name}`;

  // 输入框 或 密码框
  if (type === ParamType.text || type === ParamType.password) {
    const rules = !required
      ? []
      : max
      ? [
          {
            required: true,
            message: `${label || name || '当前项'}必填`,
            min: min || 0,
            max,
          },
        ]
      : [{ required: true, message: `${label || name || '当前项'}必填` }];
    return (
      <FormItem
        key={key}
        name={name}
        label={label || name}
        rules={rules}
        tooltip={description || null}
      >
        {type === ParamType.text ? (
          <Input
            allowClear
            placeholder={
              defaultValue
                ? `默认值：${defaultValue}`
                : `请填写${label || name || ''}`
            }
          />
        ) : (
          <Input.Password
            type="password"
            allowClear
            placeholder={
              defaultValue
                ? `默认值：${defaultValue}`
                : `请填写${label || name || ''}`
            }
          />
        )}
      </FormItem>
    );
  }
  // 单项选择
  if (type === ParamType.option) {
    const rules = !required
      ? []
      : [{ required: true, message: `${label || name || '当前项'}必填` }];
    return (
      <FormItem
        key={key}
        name={name}
        label={label || name}
        rules={rules}
        tooltip={description || null}
      >
        <RadioGroup onChange={() => onValuesChange && onValuesChange()}>
          {options.map((text) => (
            <Radio key={text} value={text}>
              {text}
            </Radio>
          ))}
        </RadioGroup>
      </FormItem>
    );
  }
  // 数字输入框
  if (type === ParamType.number) {
    const rules = !required
      ? []
      : [{ required: true, message: `${label || name || '当前项'}必填` }];
    return (
      <FormItem
        key={key}
        name={name}
        label={label || name}
        rules={rules}
        tooltip={description || null}
      >
        <InputNumber
          className="w-full"
          min={config?.min || Number.MIN_SAFE_INTEGER}
          max={config?.max || Number.MAX_SAFE_INTEGER}
          placeholder={
            defaultValue
              ? `默认值：${defaultValue}`
              : `请填写${label || name || ''}`
          }
        />
      </FormItem>
    );
  }

  // 布尔类型，开关
  if (type === ParamType.bool) {
    const rules = !required
      ? []
      : [{ required: true, message: `${label || name || '当前项'}必填` }];
    return (
      <FormItem
        key={key}
        name={name}
        label={label || name}
        valuePropName="checked"
        rules={rules}
        tooltip={description || null}
      >
        <Switch onChange={() => onValuesChange && onValuesChange()} />
      </FormItem>
    );
  }

  // 长文本类型，先渲染成textarea,后面改成代码编辑框
  if (type === ParamType.longtext) {
    const rules = !required
      ? []
      : max
      ? [
          {
            required: true,
            message: `${label || name || '当前项'}必填`,
            min: min || 0,
            max,
          },
        ]
      : [{ required: true, message: `${label || name || '当前项'}必填` }];
    return (
      <div className="mb-24 relative" key={key}>
        <Button
          type="link"
          className="code-editor-expand-btn"
          onClick={showCodeModal}
        >
          展开
          <FontIcon
            type="iconfont"
            iconClass="icon-zhankai"
            className="inline-block ml-4 align-middle"
          />
        </Button>
        <FormItem
          name={name}
          label={label || name}
          rules={rules}
          tooltip={description || null}
        >
          {/* <TextArea
            placeholder={
              defaultValue
                ? `默认值：${defaultValue}`
                : `请填写${label || name || ''}`
            }
          /> */}
          <CodeEditor
            mode={codeblock}
            className="dynamic-form-codemirror"
            placeholder={
              defaultValue
                ? `默认值：${defaultValue}`
                : `请填写${label || name || ''}`
            }
          />
        </FormItem>
        {/* <pre className="code-editor-placeholder">
          {defaultValue
            ? `默认值：${defaultValue}`
            : `请填写${label || name || ''}`}
        </pre> */}
        {visible && (
          <CodeEditorModal
            visible={visible}
            onCancle={cancleCodeModal}
            config={config}
            placeholder={
              defaultValue
                ? `默认值：${defaultValue}`
                : `请填写${label || name || ''}`
            }
          />
        )}
      </div>
    );
  }

  // 服务器IP列表，可单选或多选
  if (type === ParamType.hostname) {
    const rules = !required
      ? []
      : [{ required: true, message: `${label || name || '当前项'}必填` }];
    return (
      <FormItem
        key={key}
        name={name}
        label={label || name}
        rules={rules}
        tooltip={description || null}
      >
        <Select
          placeholder="请选择服务器"
          allowClear
          showSearch
          options={hostList}
          mode={config?.arrayValue ? 'multiple' : null}
          onChange={() => onValuesChange && onValuesChange()}
        />
      </FormItem>
    );
  }

  return null;
};

export default DynamicItem;
