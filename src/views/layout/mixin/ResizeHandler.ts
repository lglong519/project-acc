import store from "@/store";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

const { body } = document;
const WIDTH = 768;
const RATIO = 3;

@Component({})
export default class ResizeHandler extends Vue {
	@Getter sidebar: any;
	@Getter device: any;

	@Watch("$route")
	onRouteChanged(route: any) {
		if (this.device === "mobile" && this.sidebar.opened) {
			store.dispatch("CloseSideBar", { withoutAnimation: false });
		}
	}

	beforeMount(): void {
		window.addEventListener("resize", this.resizeHandler);
	}
	mounted() {
		this.resizeHandler();
	}
	isMobile(): boolean {
		const rect = body.getBoundingClientRect();
		return rect.width - RATIO < WIDTH;
	}
	resizeHandler(): void {
		if (!document.hidden) {
			const isMobile = this.isMobile();
			store.dispatch("ToggleDevice", isMobile ? "mobile" : "desktop");

			if (isMobile) {
				store.dispatch("CloseSideBar", { withoutAnimation: true });
			} else {
				const rect = body.getBoundingClientRect();
				store.dispatch("OpenSideBar", { withoutAnimation: true });
			}
		}
	}
}
