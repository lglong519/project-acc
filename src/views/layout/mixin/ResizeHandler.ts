import store from '@/store';

const { body } = document;
const WIDTH = 768;
const RATIO = 3;

export default {
	watch: {
		$route (route) {
			if (this['device'] === 'mobile' && this['sidebar'].opened) {
				store.dispatch('CloseSideBar', { withoutAnimation: false });
			}
		}
	},
	beforeMount () {
		window.addEventListener('resize', this['resizeHandler']);
	},
	mounted () {
		this['resizeHandler']();
	},
	methods: {
		isMobile () {
			const rect = body.getBoundingClientRect();
			return rect.width - RATIO < WIDTH;
		},
		resizeHandler () {
			if (!document.hidden) {
				const isMobile = this.isMobile();
				store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop');

				if (isMobile) {
					store.dispatch('CloseSideBar', { withoutAnimation: true });
				} else {
					const rect = body.getBoundingClientRect();
					store.dispatch('OpenSideBar', { withoutAnimation: true });
				}
			}
		}
	}
};
