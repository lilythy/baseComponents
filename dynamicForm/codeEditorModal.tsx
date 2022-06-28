/* eslint-disable no-nested-ternary */
import React from 'react';
import { Modal, Form } from '@perfma/heaven';
import { ParamConfig } from './types';
import CodeEditor from '@/components/code';
import './codeEditorModal.less';

const FormItem = Form.Item;

interface IProps {
  className?: string;
  config: ParamConfig;
  visible: boolean;
  placeholder?: string;
  onCancle: () => void;
}
const ArrayModal: React.FC<IProps> = ({
  className = '',
  config = {},
  visible = false,
  placeholder,
  onCancle,
}) => {
  const [form] = Form.useForm();
  // const [formVals, setFormVals] = useState({});

  // 取消或关闭弹框
  const handleCancle = () => {
    form.resetFields();
    onCancle && onCancle();
  };

  // 提交
  // const submit = async () => {
  //   const values = await form.validateFields();
  //   const submitValues = { ...record, ...values };
  //   onOk && onOk(submitValues);
  // };

  const {
    // type,
    name,
    label,
    required,
    description,
    // defaultValue,
    // group,
    // subPropertys,
    min,
    max,
    codeblock,
    // arrayValue,
    // options,
  } = config;
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
    <Modal
      className={`full-screen-code-editor-modal ${className}`}
      title={`${config?.label || ''}`}
      visible={visible}
      onCancel={handleCancle}
      footer={false}
      // footer={<Button type="primary" onClick={handleCancle}>关闭</Button>}
    >
      <FormItem
        className="full-screen-code-content"
        name={name}
        label=""
        rules={rules}
        tooltip={description || null}
      >
        <CodeEditor
          mode={codeblock}
          placeholder={placeholder}
          className="dynamic-form-codemirror"
        />
      </FormItem>
    </Modal>
  );
};

export default ArrayModal;
