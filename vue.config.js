module.exports = {
	productionSourceMap: false,
	baseUrl: '',
	devServer: {
		port: 31210,
		https: false,
		open: true,
		// proxy: 'http://localhost:4000' // 配置跨域处理
	},
	configureWebpack: {
		// 把原本需要写在webpack.config.js中的配置 写在这里 会自动合并
		module: {
			rules: [
				{
					test: /\.config$/,
					loader: 'json-loader'
				}
			]
		},
		externals: {
			lodash: '_',
			'vue': 'Vue',
			'vuex': 'Vuex',
			'vue-router': 'VueRouter',
			'element-ui': 'ELEMENT',
			'axios': 'axios',
		}
	}
}
