const mutationCreater = ({ dispatch, getState }, modules) => {
  let mutationList = {};
  Object.keys(modules).forEach(o => {
    const _module = modules[o];
    const { mutations } = _module;
    mutationList[o] = {};
    Object.keys(mutations).forEach(m => {
      mutationList[o][m] = (...args) => {
        const setState = _dispatch(dispatch, _module.reducerName, m);
        mutations[m](setState, getState, ...args);
      };
    });
  });
  return mutationList;
};

const _dispatch = (dispatch, reducerName, type) => (data) => dispatch(actionCreater(reducerName, type, data));

const actionCreater = (reducerName, type, data) => ({ reducerName, type, data });

export default mutationCreater;
