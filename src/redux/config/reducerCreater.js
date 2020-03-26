import { combineReducers } from 'redux';

const reudcerCreater = (modules) => {
  let reducers = {};
  Object.keys(modules).forEach(o => {
    const _module = modules[o];
    _module.reducerName = o;
    const initialState = _module.state;
    reducers[o] = function (state = initialState, action = {}) {
      if (action.reducerName === _module.reducerName) {
        return Object.assign({}, state, action.data);
      }
      return state;
    };
  });
  return combineReducers(reducers);
};

export default reudcerCreater;
