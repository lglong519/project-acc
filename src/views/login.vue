<template>
	<div class="app-main">
		<div class="wrapper">
			<el-card class="box-card">
				<el-row type="flex" justify="space-between">
					<div>{{type =='signin'?'登录':'注册'}}</div>
				</el-row>
				<br>
				<!-- 登录 -->
				<el-form v-show="type=='signin'" :model="form" :rules="rules" ref="form">
					<el-form-item prop="login">
						<el-input placeholder="帐号/邮箱/手机" type="text" v-model="form.login" @keyup.enter.native="signin" clearable :disabled="loading">
							<i slot="prefix" class="fa fa-user el-input__icon"></i>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input placeholder="请输入密码" :type="pwd.type" v-model="form.password" @keyup.enter.native="signin" :disabled="loading">
							<i class="fa el-input__icon" style="color:#8CC4FF" :class="pwd.icon" slot="suffix" @click="togglePwd">
							</i>
							<i slot="prefix" class="fa fa-lock el-input__icon"></i>
						</el-input>
					</el-form-item>
				</el-form>
				<!-- 注册 -->
				<el-form v-show="type=='signup'" :model="registerForm" :rules="registerRules" ref="registerForm">
					<el-form-item prop="username">
						<el-input placeholder="帐号" type="text" v-model="registerForm.username" @keyup.enter.native="signin" clearable :disabled="loading" required>
							<i slot="prefix" class="fa fa-user el-input__icon"></i>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input placeholder="设置密码" :type="pwd.type" v-model="registerForm.password" @keyup.enter.native="signin" :disabled="loading">
							<i class="fa el-input__icon" style="color:#8CC4FF" :class="pwd.icon" slot="suffix" @click="togglePwd">
							</i>
							<i slot="prefix" class="fa fa-lock el-input__icon"></i>
						</el-input>
					</el-form-item>
					<el-form-item prop="repassword">
						<el-input placeholder="确认密码" :type="pwd.type" v-model="registerForm.repassword" @keyup.enter.native="signin" :disabled="loading">
							<i class="fa el-input__icon" style="color:#8CC4FF" :class="pwd.icon" slot="suffix" @click="togglePwd">
							</i>
							<i slot="prefix" class="fa fa-lock el-input__icon"></i>
						</el-input>
					</el-form-item>
					<el-form-item prop="email">
						<el-input placeholder="邮箱" type="text" v-model="registerForm.email" @keyup.enter.native="signin" clearable :disabled="loading" required>
							<i slot="prefix" class="fa el-icon-message el-input__icon"></i>
						</el-input>
					</el-form-item>
					<el-form-item prop="phone">
						<el-input placeholder="手机号码" type="text" v-model="registerForm.phone" @keyup.enter.native="signin" clearable :disabled="loading" required>
							<i slot="prefix" class="fa fa-phone el-input__icon"></i>
						</el-input>
					</el-form-item>
				</el-form>
				<!-- btn -->
				<el-row v-if="type=='signin'" type="flex" justify="space-between">
					<el-checkbox v-model="rememberMe">记住帐号</el-checkbox>
					<div>
						<el-button type="text" size="medium" :disabled="loading" @click="swichType('signup','registerForm')">注册</el-button>
						<el-button type="primary" size="medium" :loading="loading" :disabled="loading" @click="signin" plain>{{loading?"登录中...":"登录"}}</el-button>
					</div>
				</el-row>
				<el-row v-else type="flex" justify="end">
					<el-button type="text" size="medium" :disabled="loading" @click="swichType('signin','form')">登录</el-button>
					<el-button type="primary" size="medium" :loading="loading" :disabled="loading" @click="signup" plain>{{loading?"注册...":"注册"}}</el-button>
				</el-row>
			</el-card>
		</div>
		<icp/>
	</div>
</template>
<script lang="ts">
import { icp } from "./layout/components";
import { setToken, removeToken } from "@/utils/auth";
const { LOCAL_SESSION } = require("@/.config");

import Vue from "@/types";
import { Component, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

let validateAccount = (rule: any, value: string, callback: any) => {
	if (!value) {
		return callback();
	}
	if (/^[A-Za-z_]\w{2,30}$/.test(value)) {
		return callback();
	}
	if (/^\d{11}$/.test(value)) {
		return callback();
	}
	if (/^[\w.]{3,30}@[\w.]+$/.test(value)) {
		return callback();
	}
	return callback(new Error("请输入正确的账号"));
};
let validateName = (rule: any, value: string, callback: any) => {
	if (!value) {
		return callback();
	}
	if (/^[A-Za-z_]\w{2,30}$/.test(value)) {
		return callback();
	}
	return callback(new Error("请输入正确的账号"));
};

@Component({
	components: {
		icp,
	},
})
export default class extends Vue {
	@Getter account: string | undefined;
	type: string = "signin";
	form: any = {
		login: null,
		password: null,
		client: "ACC",
	};
	registerForm: any = {
		username: null,
		password: null,
		repassword: null,
		phone: undefined,
		email: undefined,
		client: "ACC",
	};
	rememberMe: boolean = false;
	loading: boolean = false;
	rules: any = {
		login: [
			{ required: true, message: "请输入帐号", trigger: "blur" },
			{
				min: 3,
				max: 30,
				message: "长度至少 3 个字符",
				trigger: "blur",
			},
			{ validator: validateAccount, trigger: "blur" },
		],
		password: [
			{ required: true, message: "请输入密码", trigger: "blur" },
			{
				min: 6,
				max: 30,
				message: "长度至少 6 个字符",
				trigger: "blur",
			},
		],
	};
	registerRules: any = {
		username: [
			{ required: true, message: "请输入帐号", trigger: "blur" },
			{
				min: 3,
				max: 30,
				message: "长度至少 3 个字符",
				trigger: "blur",
			},
			{ validator: validateName, trigger: "blur" },
		],
		password: [
			{ required: true, message: "请输入密码", trigger: "blur" },
			{
				min: 6,
				max: 30,
				message: "长度至少 6 个字符",
				trigger: "blur",
			},
		],
		repassword: [
			{ required: true, message: "请输入密码", trigger: "blur" },
			{ validator: this.validatePassword, trigger: "blur" },
		],
		email: [
			{
				type: "email",
				message: "请输入正确的邮箱地址",
				trigger: ["blur", "change"],
			},
		],
	};
	redirect: string = "";
	pwd: any = {
		view: false,
		icon: "fa-eye-slash",
		type: "password",
	};
	@Watch("$route")
	onRouteChanged(route: any) {
		this.redirect = route.query && route.query.redirect;
	}
	mounted() {
		if (this.account) {
			this.form.login = this.account;
			this.rememberMe = true;
		}
		this.$store.dispatch("checkLogin").then(() => {
			if (this.$store.getters.isLogin) {
				this.$confirm(
					`${this.$store.getters.user} 已登录，是否前往主页？`,
					"提示",
					{
						confirmButtonText: "确定",
						cancelButtonText: "重新登录",
						type: "success",
					}
				)
					.then(() => {
						// 避免 浏览器前进后退 <- ->导致的页面错误
						if (!this.$route.path.includes("login")) {
							return;
						}
						this.$router.push({ path: this.redirect || "/" });
					})
					.catch((action: string) => {
						// 避免 浏览器前进后退 <- ->导致的页面错误
						if (!this.$route.path.includes("login")) {
							return;
						}
						if (action === "cancel") {
							this.$message({
								type: "warning",
								message: "请重新登录",
							});
							removeToken();
						}
					});
			}
		});
	}
	private validatePassword(rule: any, value: string, callback: any) {
		if (value === "") {
			callback(new Error("请再次输入密码"));
		} else if (value !== this.registerForm.password) {
			callback(new Error("两次输入密码不一致!"));
		} else {
			callback();
		}
	}
	swichType(type: string, ref: string) {
		this.type = type;
		(<any>this.$refs[ref]).clearValidate();
	}
	signin() {
		(<any>this.$refs.form).validate((valid: boolean) => {
			if (valid) {
				if (this.loading) {
					return;
				}
				this.loading = true;
				this.$store.commit(
					"SET_ACCOUNT",
					this.rememberMe ? this.form.login : ""
				);
				this.post("dis/access-tokens", this.form)
					.then((res: any) => {
						const self = this;
						this.$notify.success({
							message: "登录成功",
						});
						setToken(res[LOCAL_SESSION], res.expireAt);
						this.$store.dispatch("GetProfile");
						self.$router.push({ path: self.redirect || "/" });
					})
					.catch(() => {
						this.loading = false;
					});
			}
		});
	}
	togglePwd() {
		this.pwd.view = !this.pwd.view;
		if (this.pwd.view) {
			this.pwd.icon = "fa-eye";
			this.pwd.type = "text";
		} else {
			this.pwd.icon = "fa-eye-slash";
			this.pwd.type = "password";
		}
	}
	signup() {
		(<any>this.$refs.registerForm).validate((valid: boolean) => {
			if (valid) {
				if (this.loading) {
					return;
				}
				this.loading = true;
				this.post("dis/users", this.registerForm)
					.then((res: any) => {
						const self = this;
						this.$message({
							message: "注册成功",
							type: "success",
							onClose() {
								self.$router.push({
									path: self.redirect || "/",
								});
							},
						});
						setToken(res[LOCAL_SESSION], res.expireAt);
						this.$store.dispatch("GetProfile");
					})
					.catch(() => {
						this.loading = false;
					});
			}
		});
	}
}
</script>
<style lang="scss" scoped>
.wrapper {
	min-height: calc(100vh - 50px);
}
.box-card {
	margin: 100px auto;
	max-width: 500px;
}
@media screen and (max-width: 500px) {
	.box-card {
		margin-top: 0;
		width: 100%;
	}
}
</style>
