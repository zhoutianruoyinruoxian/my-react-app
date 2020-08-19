import React, { Component } from 'react';
import { Input } from 'antd';
import { InputFormat } from '@';
import { Content, Section } from 'src/containers';


type OnChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
export default class InputFormatTest extends Component {
  state = {
    value: undefined,
    valueOne: undefined,
    valueTwo: undefined,
  }

  onChangeOne: OnChange = (event) => {
    const valueOne = event.target.value.replace(/\D/g, '');
    this.setState({
      valueOne,
    })
  }

  onChangeTwo: OnChange = (event) => {
    const valueTwo = event.target.value.replace(/\D/g, '');
    this.setState({
      valueTwo,
    })
  }

  onChange: OnChange = (event) => {
    const value = event.target.value;
    this.setState({
      value,
    })

  }

  render() {
    const { valueOne, valueTwo, value } = this.state;
    return (
      <Content style={{ textAlign: 'left' }}>
        <div style={{ whiteSpace: 'pre', fontSize: '16px' }}>
          该组件针对input进行了格式化，旨在对input的输入中实时对文本进行特定格式的转换，输入输出不受影响。format默认为undefined，参数类型：<br></br>
          {`format: {\n    size: number,\n    symbol: string,\n    direction: 'positive' | 'reserve',\n}`}
        </div>
        <Section
          title="默认无效果与antd里Input一致"
        >
          <label>InputFormat: </label>
          <InputFormat
            defaultValue="0"
          />
          <label>Input(antd): </label>
          <Input
            defaultValue="0"
          />
        </Section>
        <Section
          title="3位数以,隔开(可用于数字的千分制)"
          description={
            <span style={{ whiteSpace: 'pre' }}>
              direction: 'reverse'表示格式化是从末尾开始的，默认为正向positive。format参数：<br></br>
              {`format: {\n    size: 3,\n    symbol: ',',\n    direction: 'reverse',\n}`}
            </span>
          }
        >
          <label>InputFormat: </label>
          <InputFormat
            value={valueOne}
            onChange={this.onChangeOne}
            format={{
              size: 3,
              symbol: ',',
              direction: 'reverse',
            }}
          />
          <label>Input(antd): </label>
          <Input
            value={valueOne}
            onChange={this.onChangeOne}
          />
        </Section>
        <Section
          title="4位数以'-'隔开(以16位数字为例)"
          description={
            <span style={{ whiteSpace: 'pre' }}>
              采用maxLength限定长度，取值跟Input一致，'-'字符不计算在内,所以设为16。format参数：<br />
              {`format: {\n    size: 4,\n    symbol: '-',\n    direction: 'positive',\n}`}
            </span>
          }
        >
          <label>InputFormat: </label>
          <InputFormat
            value={valueTwo}
            maxLength={16}
            onChange={this.onChangeTwo}
            format={{
              size: 4,
              symbol: '-',
              direction: 'positive',
            }}
          />
          <label>Input(antd): </label>
          <Input
            value={valueTwo}
            maxLength={17}
            onChange={this.onChangeTwo}
          />
        </Section>
        <Section
          title="5位数以'#'隔开(随便的情况)"
          description={
            <span style={{ whiteSpace: 'pre' }}>
              format参数：<br></br>
              {`format: {\n    size: 5,\n    symbol: '#',\n}`}
            </span>
          }
        >
          <label>InputFormat: </label>
          <InputFormat
            value={value}
            onChange={this.onChange}
            format={{
              size: 5,
              symbol: '#',
            }}
          />
          <label>Input(antd): </label>
          <Input
            value={value}
            onChange={this.onChange}
          />
        </Section>
      </Content>
    )
  }
}
