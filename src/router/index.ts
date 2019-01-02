import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login.vue";
const { REQUST, MODE } = require("@/.config");
let mode = localStorage.getItem("mode") || "";
mode || (mode = MODE);

Vue.use(VueRouter);

const Layout = (resolve: any) => require(["@/views/layout/Layout"], resolve);

const router: VueRouter = new VueRouter({
	mode: "history", // history hash
	base: "/acc/",
	routes: [
		{ path: "/404", component: () => import("@/views/404.vue") },
		{
			path: "/",
			component: Layout,
			redirect: "/index",
			// hidden: true,
			children: [
				{
					path: "index",
					name: "index",
					component: resolve =>
						require(["@/views/index/index"], resolve),
					meta: {
						title: "Index",
						icon: "home",
						type: "fa",
						tip: "MoFunc",
					},
				},
			],
		},
		{
			path: "/login",
			name: "Login",
			component: login,
		},
		{
			path: "/tiebas",
			component: Layout,
			children: [
				{
					path: "",
					name: "Tieba",
					component: () => import("@/views/tiebas/index.vue"),
					meta: { title: "Tieba", icon: "paw" },
				},
			],
		},
		{
			path: "/settings",
			component: Layout,
			children: [
				{
					path: "",
					name: "Settings",
					component: resolve =>
						require(["@/views/settings/index"], resolve),
					meta: { title: "Settings", icon: "gear" },
				},
			],
		},
		{
			path: "MoFunc.com",
			component: Layout,
			children: [
				{
					path: REQUST[mode].MAIN_DOMAIN,
					meta: { title: "MoFunc.com", icon: "link" },
				},
			],
		},
		{ path: "*", redirect: "/404" },
	],
});

export default router;

router.onError((error: Error) => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	const targetPath = (router as any).history.pending.fullPath;
	if (isChunkLoadFailed) {
		router.replace(targetPath);
	}
});
