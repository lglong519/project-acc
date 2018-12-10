import api from '@/api';
import router from '@/router';
import { removeToken } from '@/utils/auth';

export default {
	ToggleSideBar: ({ commit }) => {
		commit('TOGGLE_SIDEBAR');
	},
	CloseSideBar ({ commit }, { withoutAnimation }) {
		commit('CLOSE_SIDEBAR', withoutAnimation);
	},
	OpenSideBar ({ commit }, { withoutAnimation }) {
		commit('OPEN_SIDEBAR', withoutAnimation);
	},
	ToggleDevice ({ commit }, device) {
		commit('TOGGLE_DEVICE', device);
	},
	GetProfile ({ commit }) {
		return api.get('dis/me').then(result => {
			commit('GET_PROFILE', result);
		});
	},
	LogOut ({ commit }) {
		api.del('dis/access-tokens').then(() => {
			commit('GET_PROFILE', {});
			removeToken();
			router.push({ path: '/login', query: { redirect: router.app.$route.fullPath } });
		});
	}
};
