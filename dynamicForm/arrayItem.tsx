import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Icon } from '@perfma/heaven';
import { ParamConfig, ArrayModalItem, OptionsItemProp, Obj } from './types';
import ArrayModal from './arrayModal';
import { getCodeV6 } from '@/utils';

interface IProps {
  className?: string;
  config: ParamConfig;
  initValue?: any[];
  mode: string;
  hostList?: OptionsItemProp[];
  onChange: (name: string, data: Obj[]) => void;
}

const ArrayItem: React.FC<IProps> = ({
  className = '',
  config,
  initValue = [],
  mode = 'default',
  hostList = [],
  onChange,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [addHostDisabledList, setAddHostDisabledList] = useState([]);
  const [arrayModalItem, setArrayModalItem] = useState<ArrayModalItem>({
    visible: false,
    config: null,
    record: {},
  });

  useEffect(() => {
    setDataSource(initValue);
  }, [initValue]);

  useEffect(() => {
    setAddHostDisabledList(hostList);
  }, [hostList]);

  useEffect(() => {
    if (dataSource?.length) {
      const filterHostArr =
        (config?.subPropertys?.length &&
          config?.subPropertys.filter(
            (item: any) => item?.type === 'hostname',
          )) ||
        [];
      const hostName = filterHostArr?.length ? filterHostArr[0]?.name : '';
      if (hostName) {
        const alreadyHostList =
          dataSource?.map((item: any) => item[hostName]) || [];
        const newHostList = hostList.map((item: any) => ({
          ...item,
          disabled: alreadyHostList.includes(item.value),
        }));
        setAddHostDisabledList(newHostList);
      }
    } else {
      setAddHostDisabledList(hostList);
    }
  }, [dataSource]);

  // 数组模式显示弹框
  const showArrayModal = (param: ArrayModalItem) => {
    setArrayModalItem(param);
  };

  // 关闭数组模式弹框
  const cancleArrayModal = () => {
    setArrayModalItem({
      visible: false,
      config: null,
      record: {},
    });
  };

  // 删除
  const handleDelete = (key: string) => {
    const cpDataSource = [...dataSource];
    const idx = cpDataSource.findIndex((item: Obj) => item.key === key);
    cpDataSource.splice(idx, 1);
    setDataSource(cpDataSource);
    onChange && onChange(config.name, cpDataSource);
  };

  // 弹框增加或编辑数据提交方法
  const onOk = (values: Obj) => {
    const cpDataSource = [...dataSource];
    if (values?.key) {
      const idx = cpDataSource.findIndex(
        (item: Obj) => item?.key === values?.key,
      );
      cpDataSource[idx] = { ...cpDataSource[idx], ...values };
      setDataSource(cpDataSource);
      onChange && onChange(config.name, cpDataSource);
    } else {
      cpDataSource.push({ ...values, key: getCodeV6() });
      setDataSource(cpDataSource);
      onChange && onChange(config.name, cpDataSource);
    }
  };

  const subPropertyColumns =
    (config?.subPropertys?.length &&
      config?.subPropertys.map((item: ParamConfig) => ({
        title: item?.label || item?.name,
        dataIndex: item?.name,
        render: (text: string | number) => text || '-',
      }))) ||
    [];
  const actionColumn = [
    {
      title: '操作',
      dataIndex: 'action',
      render: (text: string, record: any) => (
        <Space size={4}>
          <Button
            type="link"
            onClick={() => showArrayModal({ config, record, visible: true })}
          >
            编辑
          </Button>
          <Button type="link" onClick={() => handleDelete(record?.key)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div key={`${mode}-${config?.type}-${config?.name}`}>
      {/* <h1>{config?.group || ''}</h1> */}
      <Table
        className={className}
        rowKey="key"
        columns={[...subPropertyColumns, ...actionColumn]}
        dataSource={dataSource}
        pagination={false}
        footer={() => (
          <Button
            type="dashed"
            block
            icon={<Icon type="PlusOutlined" />}
            onClick={() =>
              showArrayModal({
                config,
                record: {},
                visible: true,
              })
            }
          >
            添加
          </Button>
        )}
      />
      <ArrayModal
        visible={arrayModalItem.visible}
        mode={mode}
        hostList={addHostDisabledList || []}
        config={arrayModalItem.config}
        record={arrayModalItem?.record}
        onCancle={() => cancleArrayModal()}
        onOk={onOk}
      />
    </div>
  );
};

export default ArrayItem;
