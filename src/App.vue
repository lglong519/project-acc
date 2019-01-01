<template>
	<div id="formLibs">
		<router-view/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {
	name: string = "ACC";
	created() {
		// 首次进入任何非登录页面获取一次个人信息，同时可以验证是否已登录。
		if (!this.$route.path.includes("login")) {
			this.$store.dispatch("GetProfile");
		}
	}
}
</script>
