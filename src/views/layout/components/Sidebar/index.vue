<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="true"
      mode="vertical"
      background-color="#F4F5F7"
      text-color="#42526E"
      active-text-color="#409EFF"
    >
		<div class="sidebar-logo" :class="{'index-active':isIndex}">
			<router-link to='/'>M</router-link>
		</div>
		<sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"/>
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
		isIndex () {
			return this.$route.path=='/index';
		}
	}
};
</script>
<style lang="scss" scoped>
.sidebar-logo{
	&:hover{
		background-color: rgb(195, 196, 198);
		color: #409EFF;
	}
	&.index-active{
		color: #409EFF;
	}
	height: 50px;
	line-height: 50px;
	font-size: 28px;
	padding-left: 15px;
	// background-color: #6082AB;
	color: #42526E
}
</style>
