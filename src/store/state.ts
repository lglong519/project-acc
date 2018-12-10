const { MODE } =require('@/.config') ;

const state = {
	account: localStorage.getItem('account'),
	sidebar: {
		opened: !!localStorage.getItem('sidebarStatus'),
		withoutAnimation: false
	},
	device: 'desktop',
	myProfile: {},
	leftTime: 0,
	timer: null,
	mode: localStorage.getItem('mode') || MODE,
	tagsView: {
		visitedViews: [
			{
				path: '/settings',
				name: 'Settings',
				meta: { title: 'Settings', icon: 'gear' }
			}
		],
		cachedViews: ['Index','Tieba','Settings'],
	}
};

export default state;
