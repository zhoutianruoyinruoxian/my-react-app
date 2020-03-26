import modules from './modules';
import storeCreater from './config';
// import storeCreater from 'redux-small';


export const { store, mapMutations, reducers } = storeCreater(modules);

export default store;
