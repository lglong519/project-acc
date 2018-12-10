<template>
	<el-dropdown trigger="click" class="clear-all">
		<div class="mr-10">
			<el-tooltip effect="dark" :content="mode" placement="bottom">
				<el-tag type="info" size="mini">MODE</el-tag>
			</el-tooltip>
		</div>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item :class="mode=='localhost'&&'hover'">
				<span style="display:block;" @click="toggleMode('localhost')">localhost</span>
			</el-dropdown-item>
			<el-dropdown-item :class="mode=='development'&&'hover'">
				<span style="display:block;" @click="toggleMode('development')">development</span>
			</el-dropdown-item>
			<el-dropdown-item divided>
				<span style="display:block;" @click="toggleMode('')">重置</span>
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	data () {
		return {
		};
	},
	computed: {
		mode () {
			return this.$store.getters.mode;
		}
	},
	methods: {
		toggleMode (mode) {
			if (!localStorage.getItem('mode') && !mode) {
				return;
			}
			if (this.mode != mode) {
				this.$confirm('确定切换模式并重新加载?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$store.commit('SET_MODE', mode);
					this.$store.dispatch('LogOut');
					if (this.$route.path.includes('login')) {
						window.location.reload();
					} else {
						window.location.href = '/#login';
					}
				});
			}
		},
	},
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.hover {
	  background-color: #ecf5ff;
	  color: #66b1ff;
	}
</style>
