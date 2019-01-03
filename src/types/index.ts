import Vue from "vue";

export default class extends Vue {
	query: any;
	get: any;
	post: any;
	patch: any;
	del: any;
	$confirm: any;
	$notify: any;
	$store: any;
}
export interface Account {
	_id?: string;
	un?: string;
	BDUSS: string | undefined;
	active?: boolean;
	sequence?: number;
	uid?: number;
	user?: string;
}

export interface Tieba {
	_id: string;
	kw: string;
	active?: boolean;
	sequence?: number;
	fid: number;
	user: string;
	void: boolean;
}
