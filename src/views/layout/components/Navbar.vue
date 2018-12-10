<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
		<breadcrumb />
		<div class="float-right">
			<el-row type="flex" align="middle" class="mr-10">
				<el-tooltip effect="dark" :content="leftTime>0?'会话过期时间':'登录已过期'" placement="bottom">
					<el-tag size="mini" :type="leftType" :class="leftTime<60000?'blink':''">{{calcTime}}</el-tag>
				</el-tooltip>
			</el-row>
			<toggle-mode class="clear-all mr-10"></toggle-mode>
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<img :src="myProfile.image||avatar" class="user-avatar">
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<router-link to='/settings'>设置</router-link>
					</el-dropdown-item>
					<el-dropdown-item divided>
						<span style="display:block;" @click="logout">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import ToggleMode from '@/components/ToggleMode';
import processLeftTime from '@/utils/processLeftTime';

export default {
	data () {
		return {
			avatar: require('@/assets/avatar.svg'),
		};
	},
	components: {
		Breadcrumb,
		Hamburger,
		ToggleMode,
	},
	computed: {
		...mapGetters([
			'sidebar',
			'myProfile',
			'leftTime',
		]),
		calcTime () {
			let m = new Date(this.leftTime).getMinutes();
			let s = new Date(this.leftTime).getSeconds();
			m < 10 && (m = `0${m}`);
			s < 10 && (s = `0${s}`);
			if (this.leftTime > 1000 * 60 * 60) {
				let h = new Date(this.leftTime).getHours() - 8;
				return `0${h}:${m}:${s}`;
			}
			return `${m}:${s}`;
		},
		leftType () {
			if (this.leftTime > 600000) {
				return 'success';
			}
			if (this.leftTime < 60000) {
				return 'danger';
			}
			if (this.leftTime < 180000) {
				return 'warning';
			}
			return '';
		}
	},
	methods: {
		toggleSideBar () {
			this.$store.dispatch('ToggleSideBar');
		},
		logout () {
			this.$confirm('退出登录?', '', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$store.dispatch('LogOut');
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				});
			});
		},
	},
	created () {
		processLeftTime(this.$store);
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.hover {
	  background-color: #ecf5ff;
	  color: #66b1ff;
	}
	.navbar {
	  height: 50px;
	  line-height: 50px;
	  border-radius: 0px !important;
	  .hamburger-container {
	    line-height: 58px;
	    height: 50px;
	    float: left;
	    padding: 0 10px;
	  }
	  .screenfull {
	    position: absolute;
	    right: 90px;
	    top: 16px;
	    color: red;
	  }
	  .float-right {
		z-index: 1;
		position: relative;
	    float: right;
	    height: 49px;
	    display: flex;
		background-color: #fff;
	    .mr-10 {
	      margin-right: 10px;
	    }
	  }
	  .clear-all {
	    margin: 0;
	    padding: 0;
	    line-height: 48px;
	  }
	  .avatar-container {
	    height: 50px;
	    display: inline-block;
	    margin-right: 20px;
	    .avatar-wrapper {
	      cursor: pointer;
	      margin-top: 5px;
	      position: relative;
	      .user-avatar {
	        width: 40px;
	        height: 40px;
	        border-radius: 10px;
	      }
	    }
	  }
	}
	@keyframes blink {
	  0% {
	    opacity: 1;
	  }
	  100% {
	    opacity: 0;
	  }
	}

	/* 定义blink*/
	.blink {
	  animation: blink 1s linear infinite;
	}
</style>

