import React from 'react';
import ReactDOM from 'react-dom';
/**
 * @desc getConfirmLocale 的引入地址跟babel-plugin-inport插件的引入文件有关，
 * "libraryDirectory": "lib",则引用antd/lib/modal/locale
 * "libraryDirectory": "es",则引用antd/es/modal/locale
*/
import { getConfirmLocale } from 'antd/lib/modal/locale';
import Modal, { ModalFuncProps, destroyFns } from 'antd/lib/modal/Modal';

export default function openModal(config: ModalFuncProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = {
    ...config,
    close,
    getContainer: config.getContainer || false,
    visible: true,
    onCancel: () => {
      close();
      if (config.onCancel) {
        config.onCancel();
      }
    },
    children: config.content,
  } as any;

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render({ okText, cancelText, ...props }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      const runtimeLocale = getConfirmLocale();
      ReactDOM.render(
        <Modal
          {...props}
          okText={okText || runtimeLocale.okText}
          cancelText={cancelText || runtimeLocale.cancelText}
        />,
        div,
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args),
    };
    render(currentConfig);
  }

  function update(newConfig: ModalFuncProps) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}
