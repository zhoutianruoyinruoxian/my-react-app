import React from 'react';
import type { FC } from 'react';
import { Form, Row, Col } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import classNames from 'classnames';
import Item from './Item';
import './style.less';


interface Fields {

}

interface DetailFormProps extends FormProps {
  disabled?: boolean;
  fieldsConfig: Fields[]; //todo
}

const DetailForm: FC<DetailFormProps> = ({ form, disabled: propsDisabled, fieldsConfig, ...args }) => {

  const getFields = (fields, span) => fields.map((item, index) => {
    const { render, component: Component, edit = true, ...args } = item;
    const disabled = propsDisabled || !edit;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Col span={span} key={index}>
        <Item
          disabled={disabled}
          {...args}
        >
          {render?.(form) || (Reflect.has(item, 'component') && <Component form={form} />)}
        </Item>
      </Col>
    );
  });

  return (
    <Form
      form={form}
      className="detail-form"
      {...args}
    >
      <Row gutter={24}>
        {fieldsConfig.map(({ title, fields, span = 24, titleBorder, fieldsSpan = 24 }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col span={span} key={index}>
            <Row gutter={24}>
              <Col span={24}>
                <span className={classNames('title', { border: titleBorder })}>{title}</span>
              </Col>
            </Row>
            <Row gutter={24}>
              {getFields(fields, fieldsSpan)}
            </Row>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default DetailForm;
