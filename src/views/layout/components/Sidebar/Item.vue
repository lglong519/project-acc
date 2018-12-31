<script>
export default {
	name: 'MenuItem',
	functional: true,
	props: {
		icon: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		tip: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: ''
		},
	},
	render (h, context) {
		const { icon, title, type, tip } = context.props;
		const vnodes = [];
		if (icon) {
			let iconClass;
			switch (type) {
				case 'el':
					iconClass = `el-icon-${icon}`;
					vnodes.push(<i class={iconClass}></i>);
					break;
				case 'svg': vnodes.push(<svg-icon icon-class={icon}/>); break;
				default:
					iconClass = `fa fa-${icon}`;
					vnodes.push(<i class={iconClass}></i>);
			}
		}
		if(tip){
			// vnodes.push(<span slot="title">{(tip)}</span>);
		}else{
			if(title){
				vnodes.push(<span slot="title">{(title)}</span>);
			}
		}
		return vnodes;
	}
};
</script>
<style lang="scss" scoped>
.external-link {
  .sidebar-icon,span {
    color: #FEE54C;
  }
}
</style>
