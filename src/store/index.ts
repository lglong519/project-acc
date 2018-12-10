import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import tagsView from './modules/tagsView';
import checkLogin from './modules/checkLogin';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		tagsView,
		checkLogin,
	},
	state,
	getters,
	mutations,
	actions
});
export default store;
