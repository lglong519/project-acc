<template>
	<div class="app-container">
		<el-card class="summarize" shadow="hover">
			<el-row>
				总共 {{summarize.total}} 个贴吧，已签 {{summarize.resolve}} 个，待签 {{summarize.pendding}} 个，出错 {{summarize.reject}} 个，忽略 {{summarize.void}} 个， 无效 {{summarize.invalid}} 个
			</el-row>
			<el-button-group>
				<el-button plain size="mini" type="primary" @click="sync">更新列表</el-button>
				<el-button plain size="mini" type="primary" @click="toggleEdit" icon="el-icon-plus">添加帐号</el-button>
				<el-button v-if="currAccount" plain size="mini" type="primary" @click="toggleEdit(currAccount)" icon="el-icon-edit"></el-button>
				<el-button plain size="mini" type="danger" @click="deleteAccount" icon="el-icon-delete"></el-button>
			</el-button-group>
		</el-card>
		<el-tabs type="border-card" @tab-click="handleClick">
			<el-tab-pane v-for="(ac) in this.tiebaAccounts" :key="ac._id" :label="ac.un"></el-tab-pane>
			<el-alert v-if="currAccount" :title="'UID: '+currAccount.uid" type="warning" :closable="false"></el-alert>
			<el-alert v-if="currAccount" style="margin-bottom:5px;white-space:nowrap;" :title="currAccount.active?'BDUSS: '+currAccount.BDUSS:'BDUSS: 失效'" :type="currAccount.active?'info':'error'" :closable="false"></el-alert>

			<el-table :data="tiebas" :row-class-name="tableRowClassName" :header-row-class-name="headerRowClassName" v-loading="tableLoading" border stripe>
				<el-table-column prop="kw" label="吧名" fixed>
					<template slot-scope="scope">
						<a target="_blank" :onclick="`window.open('https://tieba.baidu.com/f?kw=${scope.row.kw}');`" :style="scope.row.void?'color:#f56c6c':'color:#409EFF'">{{scope.row.kw}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="level_id" label="★" align="center" width="100">
					<template slot-scope="scope">
						<el-tag size="mini">{{scope.row.cur_score}}</el-tag>
						<el-tag size="mini" type="warning">{{scope.row.level_id}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" align="center" width="50">
					<template slot-scope="scope">
						<span v-if="scope.row.status=='pendding'">待签</span>
						<span v-if="scope.row.status=='resolve'">已签</span>
						<span v-if="scope.row.status=='reject'">出错</span>
					</template>
				</el-table-column>
				<el-table-column prop="desc" label="desc">
					<template slot-scope="scope">
						<div :class="scope.row.status=='reject'&&'color-danger'">{{scope.row.desc}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="updatedAt" label="时间" min-width="100">
					<template slot-scope="scope">
						{{scope.row.updatedAt|dateTime}}
					</template>
				</el-table-column>
				<el-table-column width="70" label="忽略" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.void" :data-id="scope.row._id" ref="dataId" @change="updateVoid(scope.row)" active-color="#f56c6c" inactive-color="#409EFF"></el-switch>
					</template>
				</el-table-column>
				<el-table-column width="130">
					<template slot="header" slot-scope="scope">
						<el-select v-model="searchProp" placeholder="请选择" size="mini" :data-s="scope" @change="searchBystatus">
							<el-option v-for="item in searchProps" :key="item.label" :label="item.label" :value="item.status">
							</el-option>
						</el-select>
					</template>
					<template slot-scope="scope">
						<el-button type="warning" size="mini" plain @click="signOne(scope.row)" :disabled="scope.row.void || scope.row.status=='resolve'">签</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" plain @click="remove(scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination-container">
				<div class="float-left">
					<el-button size="small" @click="queryAccount" plain>刷新</el-button>
				</div>
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" :page-sizes="pagination.pageSizes" :total="pagination.total" @current-change="pageChange" :current-page="pagination.currentPage"></el-pagination>
			</div>
		</el-tabs>

		<!-- edit dialog -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible">
			<el-form :model="editTiebaAccount" :rules="editRules" ref="editTiebaAccount" label-width="70px" :label-position="labelPosition">
				<el-form-item v-if="editTiebaAccount._id" label="id" prop="_id">
					<el-input v-model="editTiebaAccount._id" disabled></el-input>
				</el-form-item>
				<el-form-item v-if="editTiebaAccount.un" label="un" prop="un">
					<el-input v-model="editTiebaAccount.un" disabled></el-input>
				</el-form-item>
				<el-form-item label="BDUSS" prop="BDUSS">
					<el-input type="textarea" v-model="editTiebaAccount.BDUSS" autofocus="true" autosize></el-input>
				</el-form-item>
				<el-form-item v-if="editTiebaAccount.active===true||editTiebaAccount.active===false" label="active" prop="active">
					<el-switch v-model="editTiebaAccount.active" disabled></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue, { Account, Tieba } from "@/types";
import { Getter } from "vuex-class";
import Component from "vue-class-component";

function editTiebaAccount(): Account {
	return {
		BDUSS: undefined,
	};
}
@Component
export default class extends Vue {
	@Getter device: string | undefined;
	tiebaAccounts: Account[] = [];
	tiebas: Tieba[] = [];
	currAccount: Account | any = null;
	tabIndex: number = 0;
	summarize: any = {
		total: 0,
		resolve: 0,
		pendding: 0,
		reject: 0,
		void: 0,
		invalid: 0,
	};
	pagination: any = {
		total: 0,
		currentPage: 1,
		pageSizes: [10, 20, 30, 50, 100],
		pageSize: 10,
	};
	editTiebaAccount: Account = editTiebaAccount();
	dialog: any = {
		visible: false,
		title: null,
	};
	editRules: any = {
		BDUSS: [
			{
				required: true,
				message: "请输入",
				trigger: "blur",
			},
		],
	};
	tableLoading: boolean = false;
	searchProp: string = "";
	searchProps: any[] = [
		{
			status: "",
			label: "全部",
		},
		{
			status: "pendding",
			label: "待签",
		},
		{
			status: "resolve",
			label: "已签",
		},
		{
			status: "reject",
			label: "出错",
		},
		{
			status: "void",
			label: "忽略",
		},
		{
			status: "unactive",
			label: "无效",
		},
	];
	get labelPosition(): string {
		if (this.device == "mobile") {
			return "top";
		}
		return "left";
	}
	created() {
		this.queryAccount();
	}
	// 判断是否 void 或者 active
	tableRowClassName({ row, rowIndex }: { row: Tieba; rowIndex: number }) {
		if (row.void) {
			return "delete-row";
		}
		if (!row.active) {
			return "unactive-row";
		}
		return "";
	}
	headerRowClassName() {
		return "header-row";
	}
	pageSizeChange(e: number) {
		this.pagination.pageSize = e;
		this.queryTiebas();
	}
	pageChange(e: number) {
		this.pagination.currentPage = e;
		this.queryTiebas();
	}
	queryAccount() {
		return this.query("dis/tieba-accounts?sort=createdAt").then(
			(res: any) => {
				this.tiebaAccounts = res.data;
				this.currAccount = this.tiebaAccounts[this.tabIndex];
				this.getSumarize();
				this.queryTiebas();
			}
		);
	}
	queryTiebas() {
		this.tableLoading = true;
		let query: any = {};
		if (this.currAccount) {
			query.tiebaAccount = this.currAccount._id;
		}
		Object.assign(query, generateQeuqryOptions(this.searchProp));
		return this.query(
			`dis/tiebas?pageSize=${this.pagination.pageSize}&p=${this.pagination
				.currentPage - 1}&q=${JSON.stringify(query)}`
		).then((res: any) => {
			this.pagination.total = Number(res.headers["x-total-count"]);
			this.tiebas = res.data;
			this.tableLoading = false;
		});
	}
	getSumarize() {
		if (!this.currAccount) {
			return;
		}
		return this.get(
			`dis/tieba-accounts/${this.currAccount._id}/summarize`
		).then((result: any) => {
			this.summarize = result;
		});
	}
	handleClick(tab: any) {
		if (this.tabIndex == tab.index) {
			return;
		}
		this.tabIndex = tab.index;
		this.currAccount = this.tiebaAccounts[this.tabIndex];
		this.pagination.currentPage = 1;
		this.refresh();
	}
	toggleEdit(data: Account) {
		if (data && data._id) {
			this.editTiebaAccount = JSON.parse(JSON.stringify(data));
		} else if (this.editTiebaAccount._id) {
			this.editTiebaAccount = editTiebaAccount();
		}
		this.dialog.title = this.editTiebaAccount._id ? "修改" : "添加";
		this.dialog.visible = true;
	}
	submit() {
		(<any>this.$refs.editTiebaAccount).validate(async (valid: boolean) => {
			if (valid) {
				this.dialog.visible = false;
				if (this.editTiebaAccount._id) {
					await this.patch(
						`dis/tieba-accounts/${this.editTiebaAccount._id}`,
						this.editTiebaAccount
					);
				} else {
					await this.post(
						"dis/tieba-accounts",
						this.editTiebaAccount
					);
				}
				await this.queryAccount();
				this.editTiebaAccount = editTiebaAccount();
				this.sync();
			}
		});
	}
	cancel() {
		this.dialog.visible = false;
		(this.$refs.editTiebaAccount as any).clearValidate();
		this.editTiebaAccount = editTiebaAccount();
	}
	refresh() {
		this.getSumarize();
		this.queryTiebas();
	}
	remove(data: Account) {
		this.$confirm("此操作将永久删除, 是否继续?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				await this.del(`dis/tiebas/${data._id}`);
				this.$notify.success({
					message: "删除成功",
				});
				this.refresh();
			})
			.catch((action: string) => {
				this.$notify({
					type: action === "cancel" ? "info" : "error",
					message: action === "cancel" ? "已取消删除" : "删除失败",
				});
			});
	}
	sync() {
		if (!this.currAccount) {
			return;
		}
		this.post(
			`dis/tieba-accounts/${this.currAccount._id}/tiebas/sync`
		).then(() => {
			this.$notify.success({
				message: "正在更新列表,请稍后刷新...",
			});
		});
	}
	signOne(data: Tieba) {
		this.post(`dis/tiebas/${data._id}/sign`).then((result: any) => {
			if (result.status == "resolve") {
				this.$notify.success({
					message: "签到成功",
				});
			} else {
				this.$notify.error({
					message: result.desc || "签到失败",
				});
			}
		});
	}
	updateVoid(data: Tieba) {
		this.patch(`dis/tiebas/${data._id}`, data)
			.then(() => {
				this.getSumarize();
			})
			.catch(() => {
				data.void = !data.void;
			});
	}
	searchBystatus() {
		this.pagination.currentPage = 1;
		this.queryTiebas();
	}
	deleteAccount() {
		this.$confirm(
			`此操作将永久删除帐号: ${this.currAccount.un} , 是否继续?`,
			"提示",
			{
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}
		)
			.then(async () => {
				await this.del(`dis/tieba-accounts/${this.currAccount._id}`);
				this.$notify.success({
					message: "删除成功",
				});
				this.queryAccount();
			})
			.catch((action: string) => {
				this.$notify({
					type: action === "cancel" ? "info" : "error",
					message: action === "cancel" ? "已取消删除" : "删除失败",
				});
			});
	}
}
function generateQeuqryOptions(status: string) {
	if (!status) {
		return {};
	}
	if (status == "pendding") {
		return {
			$or: [
				{
					status: "pendding",
					void: false,
					active: true,
				},
				{
					status: "resolve",
					updatedAt: {
						$lt: new Date(
							`${new Date().toLocaleDateString()} 00:00`
						),
					},
					void: false,
					active: true,
				},
			],
		};
	}
	if (status == "resolve") {
		return {
			updatedAt: {
				$gte: new Date(`${new Date().toLocaleDateString()} 00:00`),
			},
			status: "resolve",
			void: false,
			active: true,
		};
	}
	if (status == "resolve") {
		return {
			updatedAt: {
				$gte: new Date(`${new Date().toLocaleDateString()} 00:00`),
			},
			status: "resolve",
			void: false,
			active: true,
		};
	}
	if (status == "reject") {
		return {
			status: "reject",
			void: false,
			active: true,
		};
	}
	if (status == "void") {
		return {
			void: true,
			active: true,
		};
	}
	if (status == "unactive") {
		return {
			active: false,
		};
	}
	return {};
}
</script>

<style lang="scss" scoped>
.color-danger {
	color: #f56c6c;
}
.float-left {
	float: left;
}
.summarize {
	margin-bottom: 10px;
	background-color: #edeff2;
	font-size: 14px;
	color: #787b80;
	.el-row {
		margin-bottom: 5px;
	}
}
</style>
<style lang="scss">
.header-row th:nth-child(7) {
	padding: 0;
	.el-select {
		top: 4px;
		input {
			padding-left: 10px;
		}
	}
}
</style>
