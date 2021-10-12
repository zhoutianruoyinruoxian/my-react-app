import React, { Component } from 'react';
import { Input } from 'antd';
import { InputValidate } from '@';
import Test from './Test';
import { Content, Section } from 'src/containers';
import './style.scss';


type OnChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
export default class InputFormatTest extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
  }

  onChangeOne: OnChange = (event) => {
    const value = event.target.value;
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <Content style={{ textAlign: 'left' }} className="home">
        <Section
          title="aj"
        >
          <label>inputValidate: </label>
          <InputValidate
            className="doc-opt-modal-input"
            value={value}
            onChange={this.onChangeOne}
            rules={[
              {
                required: true,
                message: '文件夹名称不能为空',
              },
            ]}
          />
        </Section>
      </Content>
    );
  }
}
