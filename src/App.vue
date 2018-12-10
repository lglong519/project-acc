<template>
  <div id="formLibs">
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'form-libs',
	created () {
		// 首次进入任何非登录页面获取一次个人信息，同时可以验证是否已登录。
		if (!this.$route.path.includes('login')) {
			this.$store.dispatch('GetProfile');
		}
	}
};
</script>
