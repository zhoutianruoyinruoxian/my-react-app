// offsetWidth = width + 左右padding + 左右boder

function getStyle(dom: HTMLElement, attr: string) {
  if ((dom as any).currentStyle) {
    return Number((dom as any).currentStyle[attr].replace(/px/, ''));
  }
  else {
    return Number(document.defaultView.getComputedStyle(dom, null)[attr].replace(/px/, ''));
  }
}

type LengthType = 'inner' | 'padding' | 'border' | 'margin';

/**
 * 获取dom节点高度
 * @param {string} element 节点的选择器
 * @param {boolean} includePadding 获取高度是否要包含padding（默认值false）
 */
function getHeight(dom: HTMLElement, lengthType: LengthType = 'border') {
  try {
    switch (lengthType) {
      case 'inner':
        return dom.clientHeight - getStyle(dom, 'paddingTop') - getStyle(dom, 'paddingBottom');
      case 'padding':
        return dom.clientHeight;
      case 'border':
        return dom.offsetHeight;
      case 'margin':
        return dom.offsetHeight + getStyle(dom, 'marginBottom') + getStyle(dom, 'marginTop');
      default:
        return dom.offsetHeight;
    }
  } catch (err) {
    return 0;
  }
}

function getWidth(dom: HTMLElement, lengthType: LengthType = 'border') {
  try {
    switch (lengthType) {
      case 'inner':
        return dom.clientWidth - getStyle(dom, 'paddingLeft') - getStyle(dom, 'paddingRight');
      case 'padding':
        return dom.clientWidth;
      case 'border':
        return dom.offsetWidth;
      case 'margin':
        return dom.offsetWidth + getStyle(dom, 'marginLeft') + getStyle(dom, 'marginRight');
      default:
        return dom.offsetWidth;
    }
  } catch (err) {
    return 0;
  }
}

export {
  getStyle,
  getHeight,
  getWidth,
};

export default getStyle;
