<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#3C516B"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
		<div class="sidebar-logo">
			<router-link to='/'>{{isCollapse?'M':'MoFunc'}}</router-link>
		</div>
		<sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path" :class="isCollapse?'sidebar--collapse':''"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
	components: { SidebarItem },
	computed: {
		...mapGetters([
			'sidebar'
		]),
		routes () {
			return this.$router.options.routes;
		},
		isCollapse () {
			return !this.sidebar.opened;
		}
	}
};
</script>
<style lang="scss" scoped>
.sidebar-logo{
	height: 50px;
	line-height: 50px;
	font-size: 28px;
	text-align: center;
	background-color: #6082AB;
	color: #fff
}
</style>
