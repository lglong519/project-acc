interface State {
	sidebar: any;
	account: any;
	device: string;
	myProfile: any;
	leftTime: number;
	timer: any;
	mode: string;
}

export default {
	SET_ACCOUNT(state: State, account: any) {
		state.account = account;
		localStorage.setItem("account", account);
	},
	TOGGLE_SIDEBAR: (state: State) => {
		if (state.sidebar.opened) {
			localStorage.setItem("sidebarStatus", "1");
		} else {
			localStorage.setItem("sidebarStatus", "");
		}
		state.sidebar.opened = !state.sidebar.opened;
		state.sidebar.withoutAnimation = false;
	},
	CLOSE_SIDEBAR: (state: State, withoutAnimation: boolean) => {
		localStorage.setItem("sidebarStatus", "1");
		state.sidebar.opened = false;
		state.sidebar.withoutAnimation = withoutAnimation;
	},
	OPEN_SIDEBAR: (state: State, withoutAnimation: boolean) => {
		localStorage.setItem("sidebarStatus", "");
		state.sidebar.opened = true;
		state.sidebar.withoutAnimation = withoutAnimation;
	},
	TOGGLE_DEVICE: (state: State, device: string) => {
		state.device = device;
	},
	GET_PROFILE(state: State, myProfile: any) {
		state.myProfile = myProfile;
	},
	SET_LEFTTIME(state: State, leftTime: number) {
		state.leftTime = leftTime;
	},
	SET_TIMER(state: State, timer: any) {
		state.timer = timer;
	},
	SET_MODE(state: State, mode: string) {
		state.mode = mode;
		localStorage.setItem("mode", mode);
	},
};
