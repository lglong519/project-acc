import Vue from "vue";
import api from "@/api";
import moment from "moment";

export default {
	install(Vue, options) {
		Object.entries(api).forEach(item => {
			[, Vue.prototype[item[0]]] = item;
		});
	},
};

Vue.filter("dateTime", (value, format = "YYYY-MM-DD HH:mm:SS") => {
	// 纯数字的 string 类型的 timestamp 会报错
	if (typeof value == "string" && /^\d+$/g.test(value)) {
		value = Number(value) * 1;
	}
	return moment(value).format(format);
});

Vue.filter("currency", (value, symbol = "￥") => {
	return symbol + (value / 100).toFixed(2);
});
