import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import plugin from "./plugin";
import debug from "debug";

import "./utils/nprogress";
import "./utils/init";

import "normalize.css/normalize.css";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles/index.scss";

if (require("./.config").MODE === "localhost") {
	Vue.config.devtools = true;
	debug.enable("app");
}

Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h: any) => h(App),
}).$mount("#formLibs");
