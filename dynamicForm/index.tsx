/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  Button,
  Radio,
  Input,
  Space,
  Tag,
  message,
} from '@perfma/heaven';
import { host_list, config_update } from '@/services/deploy';
import { HostStatus, ParamType, BaseGroupName } from './config';
import { AppConfig, ParamConfig, Obj } from './types';
import DynamicItem from './DynamicItem';
import ArrayItem from './arrayItem';
import { flatten, unflatten, getCodeV6 } from '@/utils';
import { IApiResponse } from '@/services/basic/types';
import './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
interface IProps {
  className?: string;
  appConfig: AppConfig;
  refresh?: () => void;
  formType: 'card' | 'modal';
  submitApi?: any;
  onCancle?: () => void;
}
const DynamicForm: React.FC<IProps> = ({
  className = '',
  appConfig = {},
  refresh,
  formType = 'card',
  submitApi,
  onCancle,
}) => {
  const [form] = Form.useForm();
  const [hostList, setHostList] = useState([]);
  const [formValues, setFormValues] = useState<any>();
  const [finalConfig, setFinalConfig] = useState<any>();
  // const [requireObjArrNames, setRequireObjArrNames] = useState<string[]>([]); // 记录哪些是必填的对象数组，提交时需要校验
  // const [objArrNames, setObjArrNames] = useState<string[]>([]); // 记录哪些是对象数组，提交时拼接form.getFieldsValues() + formValues的这些字段提交
  const requireObjArrNamesRef = useRef([]); // 记录哪些是必填的对象数组，提交时需要校验
  const objArrNamesRef = useRef([]); // 记录哪些是对象数组，提交时拼接form.getFieldsValues() + formValues的这些字段提交

  /**
   * 查询服务器列表
   */
  const queryHostList = async (params?: any): Promise<void> => {
    const rsp = await host_list({
      serverType: 'platform-service',
      ...params,
    });
    const computedList = rsp?.data?.length
      ? rsp?.data.map(({ host, tags }) => ({
          value: host,
          label: (
            <Space size={4}>
              <span>{host}</span>
              {(tags &&
                tags.length &&
                tags.map((item: string) => (
                  <Tag className="scale-90" key={item} color="blue">
                    {item}
                  </Tag>
                ))) ||
                null}
            </Space>
          ),
        }))
      : [];
    setHostList(computedList);
  };

  const init = (configValue: Record<string, unknown>, isReset?: boolean) => {
    const flattenConfigValues = flatten(configValue);
    const fianlFormValues = {
      mode: appConfig?.mode,
      ...flattenConfigValues,
    };
    if (!formValues || isReset) {
      setFormValues(fianlFormValues);
      form.setFieldsValue(fianlFormValues);
    }

    // 处理showSubPropertyIf条件，将所有属性打平
    const flattenPropertys = [];
    appConfig?.propertyDefines &&
      appConfig?.propertyDefines[fianlFormValues.mode]?.length &&
      appConfig.propertyDefines[fianlFormValues.mode].forEach(
        (item: ParamConfig) => {
          if (item?.type !== ParamType.complex) {
            flattenPropertys.push({
              ...item,
              subPropertys: undefined,
            });

            if (item?.subPropertys?.length) {
              // 判断是否有子属性显示条件,showSubPropertyIf为该字段的值
              if (
                item?.showSubPropertyIf &&
                `${flattenConfigValues[item.name]}` === item?.showSubPropertyIf
              ) {
                item?.subPropertys?.length &&
                  item?.subPropertys.forEach((subItem: ParamConfig) => {
                    flattenPropertys.push(subItem);
                  });
              } else {
                // 如果有子属性，不满足showSubPropertyIf条件，则将子属性的值都置空
                item?.subPropertys.forEach((subItem: ParamConfig) => {
                  form?.setFieldsValue({ [subItem?.name]: undefined });
                });
              }
            }
          } else {
            // 复合类型肯定没有showSubPropertyIf条件
            flattenPropertys.push(item);
          }
        },
      );

    // 再处理showIf条件，将不符合条件的属性删除， flattenPropertys已经是打平的一层属性了
    const showIfPropertys = [];
    flattenPropertys?.length &&
      flattenPropertys.forEach((item: ParamConfig) => {
        if (!item.showIf) {
          showIfPropertys.push(item);
        } else {
          let flag = true;
          const splitArr = item.showIf.split('&&');
          for (let i = 0; i < splitArr.length; i++) {
            if (
              `${flattenConfigValues[splitArr[i].split('=')[0]]}` !==
              splitArr[i].split('=')[1]
            ) {
              flag = false;
              break;
            }
          }
          if (flag) {
            showIfPropertys.push(item);
          } else {
            // 不满足showIf条件的值置空
            form?.setFieldsValue({ [item?.name]: undefined });
          }
        }
      });

    // 再将相同的group组合到一起，以group作为key，值为一个数组
    const groupObj = {};
    showIfPropertys.forEach((item: ParamConfig) => {
      // 如果没有group字段，先归类到基础配置
      if (!item.group) {
        if (!groupObj[BaseGroupName]) {
          groupObj[BaseGroupName] = [];
          groupObj[BaseGroupName].push(item);
        } else {
          groupObj[BaseGroupName].push(item);
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (!groupObj[item.group]) {
          groupObj[item.group] = [];
          groupObj[item.group].push(item);
        } else {
          groupObj[item.group].push(item);
        }
      }
    });
    setFinalConfig(groupObj);
  };

  useEffect(() => {
    queryHostList();
    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    init(appConfig?.config);
  }, [appConfig]);

  // 模式改变
  const onModeChange = (event: any) => {
    form?.resetFields();
    const val = event.target.value;
    if (val === appConfig?.mode) {
      init(appConfig?.config, true);
    } else {
      init({ mode: val }, true);
    }
  };
  // 表单值改变时动态改变formValues
  const onValuesChange = () => {
    const lastestFormValue = { ...formValues, ...form?.getFieldsValue() };
    init(lastestFormValue);
    setFormValues(lastestFormValue);
  };

  // 输入框改变时更改formvalues
  const onInputChange = () => {
    const lastestFormValue = { ...formValues, ...form?.getFieldsValue() };
    setFormValues(lastestFormValue);
  };

  // 数组改变时，改变formValues
  const onArrayChange = (name: string, data: Obj[]) => {
    const changeFormValues = { ...formValues, [name]: data };
    setFormValues(changeFormValues);
  };

  // 动态渲染表单每项
  const renderParamConfig = (config: ParamConfig) => {
    if (!config) {
      return null;
    }

    if (config?.type !== ParamType.complex) {
      return (
        <DynamicItem
          key={`dynamicitem-${config?.name}`}
          mode={appConfig?.mode}
          hostList={hostList}
          config={config}
          onValuesChange={onValuesChange}
          onInputChange={onInputChange}
        />
      );
    }
    if (config?.type === ParamType.complex && !config?.arrayValue) {
      return (
        <div>
          {/* <h1>{config?.group || ''}</h1> */}
          {config?.subPropertys?.length &&
            config.subPropertys.map((subItemConfig: ParamConfig) => (
              <DynamicItem
                key={`${appConfig?.mode}-${subItemConfig.type}-${subItemConfig.name}`}
                mode={appConfig?.mode}
                hostList={hostList}
                config={{
                  ...subItemConfig,
                  name: `${config?.name}.${subItemConfig?.name}`,
                }}
                onValuesChange={onValuesChange}
                onInputChange={onInputChange}
              />
            ))}
        </div>
      );
    }
    if (config?.type === ParamType.complex && config?.arrayValue) {
      // 放在state里会引起死循环
      // setObjArrNames([...objArrNames, config?.name || '']);
      // if (config?.required) {
      //   setRequireObjArrNames([...requireObjArrNames, config?.name || '']);
      // }
      objArrNamesRef.current = config?.name
        ? [...objArrNamesRef.current, config?.name]
        : objArrNamesRef.current;
      if (config?.required) {
        requireObjArrNamesRef.current = config?.name
          ? [...requireObjArrNamesRef.current, config?.name]
          : requireObjArrNamesRef.current;
      }
      return (
        <ArrayItem
          key={`complex-${config?.name}`}
          mode={appConfig?.mode}
          hostList={hostList}
          config={config}
          initValue={formValues[config.name] || []}
          onChange={onArrayChange}
        />
      );
    }

    return null;
  };

  // 保存该动态表单数据
  const submit = async () => {
    const values = await form.validateFields();
    let flag = true; // 标识能提交
    if (requireObjArrNamesRef.current?.length) {
      requireObjArrNamesRef.current.forEach((name: string) => {
        if (!formValues[name] || !formValues[name]?.length) {
          flag = false;
          message.warning(`${name}字段不能为空！`);
        }
      });
    }
    if (flag) {
      let submitValue = { ...values };
      if (objArrNamesRef.current?.length) {
        objArrNamesRef.current.forEach((name: string) => {
          submitValue = { ...submitValue, [name]: formValues[name] };
        });
      }
      const submitMode = submitValue.mode;
      delete submitValue.mode;
      const unflattenValues = unflatten(submitValue);
      const { success } = submitApi
        ? await submitApi({
            id: appConfig?.id,
            mode: submitMode,
            config: unflattenValues,
          })
        : await config_update({
            id: appConfig?.id,
            mode: submitMode,
            config: unflattenValues,
          });
      if (success) {
        message.success('保存成功！');
        refresh && refresh();
      }
    }
  };

  return (
    <Form
      layout="vertical"
      key={getCodeV6()}
      form={form}
      // initialValues={formValues}
      onFinish={submit}
    >
      <FormItem
        name="mode"
        label="部署模式"
        rules={[{ required: true, message: '部署模式必填！' }]}
      >
        <RadioGroup onChange={onModeChange}>
          {appConfig?.propertyDefines &&
            Object.keys(appConfig?.propertyDefines)?.length &&
            Object.keys(appConfig?.propertyDefines).map((text: string) => (
              <Radio key={`radio-${text}`} value={text}>
                {text}
              </Radio>
            ))}
        </RadioGroup>
      </FormItem>
      {(finalConfig &&
        Object.keys(finalConfig)?.length &&
        Object.keys(finalConfig).map((key: string) => {
          if (key === BaseGroupName) {
            return (
              finalConfig[key]?.length &&
              finalConfig[key].map((item: ParamConfig) =>
                renderParamConfig(item),
              )
            );
          }
          return (
            <div key={`${key}-${getCodeV6()}`}>
              <h1>{key}</h1>
              {finalConfig[key]?.length &&
                finalConfig[key].map((item: ParamConfig) =>
                  renderParamConfig(item),
                )}
            </div>
          );
        })) ||
        null}

      {formType === 'card' && (
        <FormItem>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
      )}

      {formType === 'modal' && (
        <FormItem className="formitem-buttons">
          <Button className="mr-8" onClick={onCancle}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </FormItem>
      )}
    </Form>
  );
};

export default DynamicForm;
