/* eslint-disable */
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
		type: {
			type: String,
			default: ''
		},
	},
	render (h, context) {
		const { icon, title, type } = context.props;
		const vnodes = [];

		if (icon) {
			let iconClass;
			switch (type) {
				case 'el':
					iconClass = `sidebar-icon el-icon-${icon}`;
					vnodes.push(<i class={iconClass}></i>);
					break;
				case 'svg': vnodes.push(<svg-icon icon-class={icon}/>); break;
				default:
					iconClass = `sidebar-icon fa fa-${icon}`;
					vnodes.push(<i class={iconClass}></i>);
			}
		}
		if (title) {
			vnodes.push(<span slot="title">{(title)}</span>);
		}
		return vnodes;
	}
};
</script>
<style lang="scss" scoped>
.sidebar-icon {
  margin-right: 10px;
  color: #fff;
}
.external-link {
  .sidebar-icon,span {
    color: #FFF6B5;
  }
}
.sidebar--collapse .sidebar-icon {
  margin-left: 8px;
}
</style>
