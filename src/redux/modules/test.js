export default {
  state: {
    name: 'name',
  },
  mutations: {
    changeName(dispatch, getState, name) {
      dispatch({ name });
    },
  },
};
