<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<!-- 左侧菜单栏 -->
		<sidebar class="sidebar-container" />
		<!-- 右侧主页面 -->
		<div class="main-container">
			<!-- 导航栏 -->
			<navbar />
			<tags-view />
			<!-- 内容区 -->
			<app-main />
			<icp/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "@/types";
import { Component } from "vue-property-decorator";
import { Navbar, Sidebar, AppMain, TagsView, icp } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { Getter } from "vuex-class";

@Component({
	components: {
		Navbar,
		Sidebar,
		AppMain,
		TagsView,
		icp,
	},
	mixins: [ResizeMixin],
})
export default class Layout extends Vue {
	@Getter sidebar: any;
	@Getter device: string | undefined;
	get classObj() {
		return {
			hideSidebar: !this.sidebar.opened,
			openSidebar: this.sidebar.opened,
			withoutAnimation: this.sidebar.withoutAnimation,
			mobile: this.device === "mobile",
		};
	}
	public handleClickOutside() {
		this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
.drawer-bg {
	//   background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}
</style>
