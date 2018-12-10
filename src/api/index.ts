import Service from '@/utils/request';
const get = (method = 'get') => (url:string, params = {}, config = {}) => Service[method](url, { params, ...config }).then(res => res.data);
const post = (method = 'post') => (url:string, params = {}, config = {}) => Service[method](url, params, config).then(res => res.data);
const query = (url:string, params = {}, config = {}) => Service.get(url, { params, ...config });

export default {
	get: get(),
	del: get('delete'),
	head: get('head'),
	post: post(),
	put: post('put'),
	patch: post('patch'),
	query
};
