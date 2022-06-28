import React, { useEffect } from 'react';
import { Modal, Form } from '@perfma/heaven';
import { ParamConfig, Obj, OptionsItemProp } from './types';
import DynamicItem from './DynamicItem';

interface IProps {
  className?: string;
  config: ParamConfig;
  record?: Obj;
  mode: string;
  hostList: OptionsItemProp[];
  visible: boolean;
  onCancle: () => void;
  onOk: (values?: Obj) => void;
}
const ArrayModal: React.FC<IProps> = ({
  className = '',
  config = {},
  record = {},
  mode = 'default',
  hostList = [],
  visible = false,
  onCancle,
  onOk,
}) => {
  const [form] = Form.useForm();
  // const [formVals, setFormVals] = useState({});
  // 初始化
  useEffect(() => {
    form.setFieldsValue({ ...record });
    // setFormVals({ ...record });
  }, [config, record]);

  // 取消或关闭弹框
  const handleCancle = () => {
    form.resetFields();
    onCancle && onCancle();
  };

  // 提交
  const submit = async () => {
    const values = await form.validateFields();
    const submitValues = { ...record, ...values };
    onOk && onOk(submitValues);
  };

  return (
    <Modal
      className={className}
      title={`${config?.group || ''}`}
      visible={visible}
      onOk={submit}
      onCancel={handleCancle}
    >
      <Form form={form} layout="vertical" initialValues={record}>
        {config?.subPropertys?.length &&
          config?.subPropertys.map((subItemConfig: ParamConfig) => (
            <DynamicItem
              key={`${mode}-${subItemConfig.type}-${subItemConfig.name}`}
              mode={mode}
              hostList={hostList}
              config={subItemConfig}
            />
          ))}
      </Form>
    </Modal>
  );
};

export default ArrayModal;
