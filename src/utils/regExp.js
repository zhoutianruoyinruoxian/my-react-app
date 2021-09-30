import _ from 'lodash';

export const regExp = {
  email: /^([a-zA-Z0-9]+[_.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_-]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/,
  mobile: /^1\d{10}$/,
  chinese: /^[\u4e00-\u9fa5]*$/, // 只允许填写中文
  numberOrLetters: /^[a-zA-Z0-9]*$/, // 只允许填写数字和字母
  numberOrLetters1: /^[a-zA-Z0-9_]*$/, // 只允许填写数字和字母和下划线
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
  pssword1: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/, // 强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)
  password2: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-z])(?=.*[_!@#$%^&*`~()-+=])|(?=.*\d)(?=.*[_!@#$%^&*`~()-+=])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[_!@#$%^&*`~()-+=]).{8,10}$/, // 强密码(密码中至少包含以下三种类型的字符：数字、大写字母、小写字母、特殊符号，长度在8-10之间)
};

export const validatePassword = value => {
  if (_.isEmpty(value)) {
    return Promise.resolve();
  }
  if (!/^[a-zA-Z0-9_!@#$%^&*`~()-+=]{8,16}$/.test(value)) {
    return Promise.reject(Error('请输入8-16位由数字、大小写字母、特殊字符组成的密码'));
  }
  let errNum = 0;
  if (!value.match(/[a-z]/g)) {
    errNum++;
  }
  if (!value.match(/[A-Z]/g)) {
    errNum++;
  }
  if (!value.match(/\d/g)) {
    errNum++;
  }
  if (!value.match(/[_!@#$%^&*`~()-+=]/g)) {
    errNum++;
  }
  if (errNum > 1) {
    return Promise.reject(Error('密码中至少包含以下三种类型的字符：数字、大写字母、小写字母、特殊符号'));
  }
  return Promise.resolve();
};
