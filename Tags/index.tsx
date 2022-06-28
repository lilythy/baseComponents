/* eslint-disable no-nested-ternary */
import React from 'react';
import { Tag, Tooltip } from '@perfma/heaven';
import { getCodeV6, strTo8Num } from '@/utils';
import { TagBgColors } from './config';

interface IProps {
  className?: string;
  value?: string | any[];
  splitChar?: string;
  key?: string;
  max?: number;
}

const Tags: React.FC<IProps> = ({
  className = '',
  splitChar,
  value = '',
  max = 3,
  key,
}) =>
  !value || !value?.length ? null : (
    <span className={`${className}`}>
      {typeof value === 'string' ? (
        value.split(splitChar)?.length ? (
          value.split(splitChar)?.length > max ? (
            <span>
              {value
                .split(splitChar)
                .slice(0, max)
                .map(
                  (item: string) =>
                    (item && (
                      <Tag
                        maxLength={15}
                        key={`${item}_${getCodeV6()}`}
                        color={TagBgColors[`${strTo8Num(item)}`]}
                      >
                        {item}
                      </Tag>
                    )) ||
                    '--',
                )}
              <Tooltip
                color="white"
                placement="top"
                title={
                  <div>
                    {value
                      .split(splitChar)
                      .slice(max)
                      .map((item: string) => (
                        <div className="my-8" key={item}>
                          {(item && (
                            <Tag
                              maxLength={15}
                              key={`${item}_${getCodeV6()}`}
                              color={TagBgColors[`${strTo8Num(item)}`]}
                            >
                              {item}
                            </Tag>
                          )) ||
                            '-'}
                        </div>
                      ))}
                  </div>
                }
                arrowPointAtCenter
              >
                <Tag maxLength={15} color="blue">
                  +{value.split(splitChar).length - max}
                </Tag>
              </Tooltip>
            </span>
          ) : (
            <span>
              {value.split(splitChar).map(
                (item: string) =>
                  (item && (
                    <Tag
                      maxLength={15}
                      key={`${item}_${getCodeV6()}`}
                      color={TagBgColors[`${strTo8Num(item)}`]}
                    >
                      {item}
                    </Tag>
                  )) ||
                  '-',
              )}
            </span>
          )
        ) : null
      ) : value?.length > max ? (
        <span>
          {value.slice(0, max).map((item: any) =>
            typeof item === 'string'
              ? (item && (
                  <Tag
                    maxLength={15}
                    key={`${item}_${getCodeV6()}`}
                    color={TagBgColors[`${strTo8Num(item)}`]}
                  >
                    {item}
                  </Tag>
                )) ||
                '-'
              : (item[key] && (
                  <Tag
                    maxLength={15}
                    key={item[key]}
                    color={TagBgColors[`${strTo8Num(item[key])}`]}
                  >
                    {item[key]}
                  </Tag>
                )) ||
                '-',
          )}
          <Tooltip
            color="white"
            placement="top"
            title={
              <div>
                {value.slice(max).map((item: any) => (
                  <div
                    className="my-8"
                    key={item?.key || `${item}_${getCodeV6()}`}
                  >
                    {typeof item === 'string'
                      ? (item && (
                          <Tag
                            maxLength={15}
                            key={`${item}_${getCodeV6()}`}
                            color={TagBgColors[`${strTo8Num(item)}`]}
                          >
                            {item}
                          </Tag>
                        )) ||
                        '-'
                      : (item[key] && (
                          <Tag
                            maxLength={15}
                            key={item[key]}
                            color={TagBgColors[`${strTo8Num(item[key])}`]}
                          >
                            {item[key]}
                          </Tag>
                        )) ||
                        '-'}
                  </div>
                ))}
              </div>
            }
            arrowPointAtCenter
          >
            <Tag maxLength={15} color="blue">
              +{value.length - max}
            </Tag>
          </Tooltip>
        </span>
      ) : value?.length && value?.length <= max ? (
        <span>
          {value.map((item: any) =>
            typeof item === 'string'
              ? (item && (
                  <Tag
                    maxLength={15}
                    key={`${item}_${getCodeV6()}`}
                    color={TagBgColors[`${strTo8Num(item)}`]}
                  >
                    {item}
                  </Tag>
                )) ||
                '-'
              : (item[key] && (
                  <Tag
                    maxLength={15}
                    key={item[key]}
                    color={TagBgColors[`${strTo8Num(item[key])}`]}
                  >
                    {item[key]}
                  </Tag>
                )) ||
                '-',
          )}
        </span>
      ) : null}
    </span>
  );

export default Tags;
