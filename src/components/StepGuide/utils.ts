const scale = 5;

export function getPosition(placement, tarPosition, position, arrowSize) {
  if (verticalPlacement.includes(placement)) {
    const left = placement.includes('left');
    return getVertical(placement, left, tarPosition, position, arrowSize);
  }
  if (horizontalPlacement.includes(placement)) {
    const top = placement.includes('top');
    return getHorizontal(placement, top, tarPosition, position, arrowSize);
  }
  return { arrow: {}, content: {} };
}

const verticalPlacement = ['right', 'rightTop', 'rightBottom', 'left', 'leftTop', 'leftBottom'];
const horizontalPlacement = ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'];

function getVertical(placement, left, tarPosition, position, arrowSize) {
  const {
    width: tarWidth,
    height: tarHeight,
    top: tarTop,
    left: tarLeft,
  } = tarPosition;
  const {
    width,
    height,
  } = position;
  const tarCenter = tarTop + tarHeight / 2;
  let contentTop = 0;
  const contentLeft = left ? tarLeft - width - 5 : tarLeft + tarWidth + 5;
  if (placement.includes('Top')) {
    contentTop = tarCenter - height / scale;
  } else if (placement.includes('Bottom')) {
    contentTop = tarCenter - height / scale * (scale - 1);
  } else {
    contentTop = tarCenter - height / 2;
  }
  contentTop = getMin(contentTop);
  return {
    arrow: { top: tarCenter - contentTop - arrowSize },
    content: { top: contentTop, left: contentLeft },
  };
}

function getHorizontal(placement, top, tarPosition, position, arrowSize) {
  const {
    width: tarWidth,
    height: tarHeight,
    top: tarTop,
    left: tarLeft,
  } = tarPosition;
  const {
    width,
    height,
  } = position;
  const tarCenter = tarLeft + tarWidth / 2;
  const contentTop = top ? tarTop - height - 5 : tarTop + tarHeight + 5;
  let contentLeft = 0;
  if (placement.includes('Left')) {
    contentLeft = tarCenter - width / scale;
  } else if (placement.includes('Right')) {
    contentLeft = tarCenter - width / scale * (scale - 1);
  } else {
    contentLeft = tarCenter - width / 2;
  }
  contentLeft = getMin(contentLeft);
  return {
    arrow: { left: tarCenter - contentLeft - arrowSize },
    content: { top: contentTop, left: contentLeft },
  };
}

function getMin(num: number) {
  return num > 0 ? num : 0;
}

function getWinSize() {
  if (window.innerWidth !== undefined) {
    return { width: window.innerWidth, height: window.innerHeight };
  } else {
    const D = document.documentElement;
    return { width: D.clientWidth, height: D.clientHeight };
  }
}

// function getVertical(placement) {
//   const winWidth = getWinSize();
//   const {
//     width: tarWidth,
//     height: tarHeight,
//     left: tarLeft,
//     right: tarRight,
//     top: tarTop,
//     bottom: tarBottom,
//   } = tarPosition;
//   const {
//     width,
//     height,
//     left,
//     right,
//     top,
//     bottom,
//   } = position;
//   if (width + tarWidth + tarLeft < winWidth) {
//     if () {

//     }
//   } else if () {

//   }
// }
