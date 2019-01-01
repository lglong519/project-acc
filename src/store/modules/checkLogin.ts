import api from "@/api";
import { Commit } from "vuex";

interface State {
	isLogin: boolean;
	user: any;
}

const checkLogin = {
	state: {
		isLogin: false,
		user: undefined,
	},
	mutations: {
		SET_LOGIN(state: State, data: any) {
			state.isLogin = data.status;
			state.user = data.user;
		},
	},
	actions: {
		checkLogin({ commit }: { commit: Commit }) {
			return api.get("dis/access-tokens").then((result: any) => {
				if (result.code == 2000) {
					result.status = true;
					commit("SET_LOGIN", result);
				} else {
					commit("SET_LOGIN", result);
				}
			});
		},
	},
};

export default checkLogin;
