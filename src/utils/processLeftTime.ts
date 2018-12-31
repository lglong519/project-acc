import { getToken } from "@/utils/auth";
import router from "@/router";
import { MessageBox } from "element-ui";

export default function processLeftTime(store) {
	if (store.getters.timer) {
		return;
	}
	let tick = () => {
		let cacheTime = store.getters.leftTime;
		if (!router.app.$route.path.includes("login")) {
			let token = getToken();
			let time: string | number = getToken("expireAt") || "";
			if (/\d+/g.test(time)) {
				time = Number(time) * 1;
			}
			if (token) {
				store.commit(
					"SET_LEFTTIME",
					new Date(time).getTime() - Date.now()
				);
			} else {
				if (store.getters.leftTime != 0) {
					store.commit("SET_LEFTTIME", 0);
				}
			}
		}
		if (store.getters.timer) {
			clearTimeout(store.getters.timer);
			store.commit("SET_TIMER", null);
		}
		/*
			如果时间已经为0，弹出对话框提示，重新登录 或 留在当前页面
			选择：
				1.重新登录，跳转到登录页面
				2.留在当前页面,停止计时器
				3.重新登录后再次启动
		*/
		if (
			cacheTime != 0 &&
			store.getters.leftTime == 0 &&
			!router.app.$route.path.includes("login")
		) {
			MessageBox.confirm("登录超时，是否重新登录?", "", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "error",
			}).then(() => {
				router.push({
					path: "/login",
					query: { redirect: router.app.$route.fullPath },
				});
			});
		} else {
			store.commit("SET_TIMER", setTimeout(tick, 1000));
		}
	};
	tick();
}
