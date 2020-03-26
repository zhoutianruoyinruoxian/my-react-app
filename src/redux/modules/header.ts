export default {
  state: {
    hideMenu: false,
  },
  mutations: {
    toggleMenu(setState, getState, state) {
      setState({ hideMenu: state });
    },
  },
};
