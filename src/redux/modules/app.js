export default {
  state: {
    title: 'demo',
    name: 'name',
  },
  mutations: {
    changeTitle(setState, getState, title) {
      setState({ title });
    },
    changeName(dispatch, getState, name) {
      dispatch({ name });
    },
  },
};
