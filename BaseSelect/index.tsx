import cls from "classnames";
import { Select } from "@perfma/heaven";
import { CommonContext, useDebounce } from "@/common";
import style from "./index.module.scss";

const BaseSelect = (props: any) => {
  let {
    className,
    options,
    value,
    debounce,
    onChange,
    showSearch,
    onSearch,
    ...rest
  } = props || {};
  options = options || [];

  // 为什么第一次输入的防抖不生效？
  const [handleSearch, controlledProps] = useDebounce(
    debounce,
    onSearch,
    value
  );

  const doSearch = (value: any) => {
    handleSearch && handleSearch(value, rest);
  };

  const onHandleChange = (value: string, option: any) => {
    if (!value && !rest.pidname) {
      handleSearch && handleSearch(value, option);
    }
    onChange(value, option);
  };

  return (
    <CommonContext.Consumer>
      {({ disabled }) => (
        <Select
          className={cls(style.baseSelect, className)}
          allowClear
          placeholder="请选择"
          disabled={!!disabled}
          showSearch={showSearch}
          // value={value}
          onChange={onHandleChange}
          onSearch={doSearch}
          {...controlledProps}
          {...rest}
        >
          {(options as any[]).map((option: any) => (
            <Select.Option
              key={option.key || option?.id}
              value={option.value}
              data={option}
              disabled={option.disabled}
            >
              {option.text}
            </Select.Option>
          ))}
        </Select>
      )}
    </CommonContext.Consumer>
  );
};

export default BaseSelect;
