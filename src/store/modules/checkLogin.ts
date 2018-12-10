import api from '@/api';

const checkLogin = {
	state: {
		isLogin: false,
		user: undefined,
	},
	mutations: {
		SET_LOGIN (state, data) {
			state.isLogin = data.status;
			state.user = data.user;
		}
	},
	actions: {
		checkLogin ({ commit }) {
			return api.get('dis/access-tokens').then(result => {
				if (result.code == 2000) {
					result.status = true;
					commit('SET_LOGIN', result);
				} else {
					commit('SET_LOGIN', result);
				}
			});
		}
	}
};

export default checkLogin;
