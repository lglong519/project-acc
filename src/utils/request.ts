import axios from "axios";
import router from "@/router";
import store from "@/store";
import { getToken, expireToken } from "@/utils/auth";
const { SESSION_KEY, REQUST, MODE, SESSION_EXPIRE_TIME } = require("@/.config");
import { Message, MessageBox } from "element-ui";
import _ from "lodash";
const debug = require("debug")("app:request");
let mode = localStorage.getItem("mode") || "";
mode || (mode = MODE);

process.env.NODE_ENV == "production" && (mode = "development");

// create an axios instance
const service = axios.create({
	baseURL: REQUST[mode].BASE_URL, // api的base_url
	timeout: 300000, // request timeout
	withCredentials: true,
});

// request interceptor
service.interceptors.request.use(
	config => {
		// Do something before request is sent
		if (getToken()) {
			// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
			config.headers[SESSION_KEY] = getToken();
		}

		config.headers["x-requested-with"] = "XMLHttpRequest";
		config.headers["x-serve"] = "service";
		return config;
	},
	error => {
		// Do something with request error
		debug(error); // for debug
		Promise.reject(error);
	}
);

// respone interceptor
service.interceptors.response.use(
	response => {
		debug("response", response);
		if (!_.get(response, "data.accessToken")) {
			expireToken(Date.now() + SESSION_EXPIRE_TIME);
		}
		return response;
	},
	error => {
		debug(error);
		let duration = 3000;
		let redirect: { path: string; query: any };
		let message;
		if (
			_.get(error, "response.status") === 401 ||
			_.get(error, "response.status") === 403
		) {
			store.commit("GET_PROFILE", {});
			message = "未登录";
			_.get(error, "response.status") === 403 && (message = "权限不足");
			duration = 2000;
			redirect = {
				path: "/login",
				query: { redirect: router.app.$route.fullPath },
			};
		}
		Message({
			message:
				message ||
				_.get(error, "response.data.message") ||
				_.get(error, "response.data.errors.type.message") ||
				error.message,
			type: "error",
			duration,
			onClose() {
				redirect && router.push(redirect);
			},
		});
		return Promise.reject(error);
	}
);

export default service;
