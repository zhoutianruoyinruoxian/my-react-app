/**
 * @desc 该组件用于支持搜索的，数据量较大的单选框
*/

import React, { Component } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import isEqual from 'lodash-es/isEqual';

const { Option } = Select;

interface SelectSearchState<T> {
  options: T[];
  propsOptions: T[]; // 所有的options列表，仅用来跟nextProps对比以更新options
}

interface OptionMap {
  children?: string | number;
  value?: string | number;
  key?: string | number;
}

export interface SelectSearchProps<T> extends SelectProps {
  max?: number;
  options?: T[];
  optionMap?: OptionMap
}

export default class SelectSearch<T = any> extends Component<SelectSearchProps<T>, SelectSearchState<T>> {
  select: Select;
  readonly state: SelectSearchState<T>;

  static defaultProps = {
    showSearch: true,
    max: 50,
    optionFilterProp: 'children',
    options: [],
    optionMap: {
      children: 'name',
      value: 'value',
      key: 'value',
    }
  }

  static getDerivedStateFromProps<T>(nextProps: SelectSearchProps<T>, prevState: SelectSearchState<T>) {
    if (!isEqual(nextProps.options, prevState.propsOptions)) {
      return {
        options: this.cutList(nextProps),
        propsOptions: nextProps.options,
      }
    }
    return null;
  }

  private static cutList<T>(props: SelectSearchProps<T>, value = '') {
    const { options: list, max } = props;
    let options: T[];
    if (value !== '') {
      const { children } = props.optionMap;
      options = list.filter(o => ~o[children].indexOf(value)).slice(0, max);
    } else {
      options = list.slice(0, max);
    }
    return options;
  }

  constructor(props: SelectSearchProps<T>) {
    super(props);
    this.state = {
      options: [],
      propsOptions: props.options,
    }
  }

  componentDidMount() {
    this.cut();
  }

  // componentWillReceiveProps(nextProps: SelectSearchProps<T>) {
  //   if (!isEqual(nextProps, this.props)) {
  //     this.cut(nextProps);
  //   }
  // }

  cut = (props: SelectSearchProps<T> = this.props) => {
    const options = SelectSearch.cutList(props);
    this.setState({
      options,
    })
  }

  handleChange: SelectProps['onChange'] = (value, option) => {
    // 在组件未失去焦点的情况下清空选择框，则重置options选项列表
    if (typeof value === 'undefined' || Array.isArray(value) && value.length === 0) this.cut();
    this.props.onChange && this.props.onChange(value, option);
  }

  handleSearch = (value: string) => {
    const options = SelectSearch.cutList(this.props, value);
    this.setState({
      options,
    }, () => {
      this.props.onSearch && this.props.onSearch(value);
    })
  }

  handleBlur: SelectProps['onBlur'] = (value) => {
    this.cut();
    this.props.onBlur && this.props.onBlur(value);
  }

  render() {
    const { options } = this.state;
    const { optionMap, ...arg } = this.props;
    const { children, value, key = value } = optionMap;
    return (
      <Select
        ref={ref => this.select = ref}
        {...arg}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      >
        {
          options.map((item) => {
            if (item[key] == undefined) throw new Error(`'optionMap' set error`);
            return (<Option value={item[value]} key={item[key]}>{item[children]}</Option>)
          })
        }
      </Select>
    )
  }
}
