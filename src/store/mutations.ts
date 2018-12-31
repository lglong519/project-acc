export default {
	SET_ACCOUNT(state, account) {
		state.account = account;
		localStorage.setItem("account", account);
	},
	TOGGLE_SIDEBAR: state => {
		if (state.sidebar.opened) {
			localStorage.setItem("sidebarStatus", "1");
		} else {
			localStorage.setItem("sidebarStatus", "");
		}
		state.sidebar.opened = !state.sidebar.opened;
		state.sidebar.withoutAnimation = false;
	},
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		localStorage.setItem("sidebarStatus", "1");
		state.sidebar.opened = false;
		state.sidebar.withoutAnimation = withoutAnimation;
	},
	OPEN_SIDEBAR: (state, withoutAnimation) => {
		localStorage.setItem("sidebarStatus", "");
		state.sidebar.opened = true;
		state.sidebar.withoutAnimation = withoutAnimation;
	},
	TOGGLE_DEVICE: (state, device) => {
		state.device = device;
	},
	GET_PROFILE(state, myProfile) {
		state.myProfile = myProfile;
	},
	SET_LEFTTIME(state, leftTime) {
		state.leftTime = leftTime;
	},
	SET_TIMER(state, timer) {
		state.timer = timer;
	},
	SET_MODE(state, mode) {
		state.mode = mode;
		localStorage.setItem("mode", mode);
	},
};
