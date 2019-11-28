import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

Vue.use(Vuex);

// Create store
const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
});

// Check if initStore exists in all modules,
// if so, dispatch it
Object.keys(modules).forEach((moduleName) => {
  if (modules[moduleName].actions && modules[moduleName].actions.initStore) {
    store.dispatch(`${moduleName}/initStore`);
  }
});

export default store;
