import React, { SFC } from 'react';
import { Form } from 'antd';
import FormItem from './Item';
import { FormItemProps, FormProps } from 'antd/lib/form';
import { ConnectedComponentClass } from 'antd/lib/form/interface';
import _ from 'lodash-es';

function isInstanceOfClass(instance, classConstructor) {
  if (_.isPlainObject(instance) && _.isFunction(instance.type)) {
    return instance.type === classConstructor || _.get(instance, 'type.__proto__') === classConstructor;
  }
  return false;
}

interface BindFormProps extends FormProps {
  onLoad: (form: any) => void;
  children: (form: any) => React.ReactNode;
}

export class BindForm extends React.Component<BindFormProps, any> {
  componentDidMount() {
    const { form, onLoad } = this.props;
    onLoad && onLoad(form)
  }


  // deepClone(doms) {
  //   if (doms === null || doms === undefined) {
  //     return null;
  //   }
  //   let cloneElements = [];
  //   React.Children.toArray(doms).forEach((element: any, index) => {
  //     // 纯文字组件处理
  //     if (!_.isObject(element)) {
  //       cloneElements.push(element);
  //     }
  //     // submit 按钮处理 数据校验
  //     else if (element.props && element.props.htmlType === 'submit') {
  //       cloneElements.push(React.cloneElement(element, {
  //         onClick: e => {
  //           e.preventDefault();
  //           this.onSubmit();
  //         }
  //       }));
  //     }
  //     // 表单控件处理
  //     else if (isInstanceOfClass(element, Item) && element.props.dataIndex) {
  //       let children = this.deepClone(element.props.children);
  //       cloneElements.push(React.cloneElement(element, {
  //         ref: item => {
  //           item && this.items.push(item);
  //         },
  //         value: _.get(this.props.value, element.props.dataIndex),
  //         emitChange: this.onItemChange.bind(this),
  //         itemProps: this.props.itemProps,
  //         onCheckFormValidateHandler: this.onCheckFormValidateHandler
  //       }, children));
  //     }
  //     // 表单控件 非受控处理
  //     else if (isInstanceOfClass(element, Item) && !element.props.dataIndex) {
  //       let children = this.deepClone(element.props.children);
  //       cloneElements.push(React.cloneElement(element, {
  //         itemProps: this.props.itemProps
  //       }, children));
  //     }
  //     // 非表单节点处理 递归处理
  //     else {
  //       let children = this.deepClone(element.props.children);
  //       cloneElements.push(React.cloneElement(element, null, children));
  //     }
  //   });

  //   if (cloneElements.length === 1) {
  //     return cloneElements[0];
  //   }
  //   return cloneElements;
  // }

  render() {
    const { form, children, ...args } = this.props;
    const list = React.Children.toArray(children);
    // const childrenList = list.map((thisArg) => {
    //   console.dir(thisArg)
    //   console.log(isInstanceOfClass(thisArg, FormItem), 333)
    //   return React.cloneElement(thisArg as any, { form })
    // })
    return (
      <Form
        {...args}
      >
        {/* {childrenList} */}
        {children && children(form)}
      </Form >
    )
  }
}


class FormX extends React.Component<any, any> {
  static Item: any = FormItem;
  form: any;
  render() {
    const { onChange, ...args } = this.props;
    const options = {
      onValuesChange(props, changedValues, allValues) {
        onChange && onChange(changedValues, allValues, props);
      }
    }
    const BindingForm = Form.create(options)(BindForm);
    const onLoad = (form: any) => {
      this.form = form;
    }
    return (
      <BindingForm onLoad={onLoad} {...args} />
    )
  }
}

export default FormX;