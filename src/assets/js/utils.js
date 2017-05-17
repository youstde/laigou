const utils = {
	server () {
		const hostname = location.hostname;
		let server = '';
		if (hostname === 'wx.adbaitai.com') {
			server = 'https://adbaitai.com';
		} else if (hostname === 'wxpre.adbaitai.com') {
			server = 'https://wxpre.adbaitai.com';
		} else {}
		console.log('server:' + server);
		return server;
	},
	isObject (o) {
		return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Object]';
	},
	getJsonData (o, k) {
		return utils.isObject(o) && typeof k === 'string' && o[k] && o[k].success && o[k].data && o[k].data.length ? o[k].data : null;
	},
	addKey (o, k, v) {
		if (!Array.isArray(o) && !utils.isObject(o)) return;
		if (Array.isArray(o)) {
			o.forEach((item, index) => {
				item[k] = v;
			})
			return o;
		}
		return o[k] = v;
	},
	parse (str) {
		if (typeof str === 'string') {
			return JSON.parse(str);
		}
		return str;
	},
	stringify (obj) {
		if (utils.isObject(obj)) {
			return JSON.stringify(obj);
		}
		return obj;
	},
  getQueryString (url, name) {
    const reg = new RegExp('(^|\\?|&)' + name + '=([^&#]*)(\\s|&|#|$)','i');
    if(reg.test(url)) return RegExp.$2.replace(/\+/g, ' ');
  }
};

export default utils;
