import Vue from 'vue';
import Vuex from 'vuex';

import fibonacci from './modules/fibonacci.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fibonacci
  }
});