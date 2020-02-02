const cfConfig = require('./.contentful.json');

module.exports = {
	mode: 'universal',
	srcDir: './src',
	rootDir: './',
	modules: ['@nuxtjs/axios'],
	axios: {
		proxyHeaders: true
	},
	buildModules: [
		'@nuxtjs/vuetify',
		'@nuxt/typescript-build'
	],
	head: {
		titleTemplate: '%s',
		title: 'Notice Everything Creative',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'google-site-verification',
				name: 'google-site-verification',
				content: '8xz5eEwIDRcsv1MNipBSTdLI9-gZ0AWX2dp6ZHL2iA'
			}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
			{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Poiret+One&display=swap' }
		]
	},
	env: {
		apiHost: process.env.API || 'http://localhost:3000/api',
		CTF_SPACE_ID: cfConfig.CTF_SPACE_ID,
		CTF_CDA_ACCESS_TOKEN: cfConfig.CTF_CDA_ACCESS_TOKEN,
		CTF_PROJECT_TYPE_ID: cfConfig.CTF_PROJECT_TYPE_ID
	},
	build: {
		extractCSS: true,
		extend(config, ctx)
		{
			ctx.isModern = true;
			ctx.isLegacy = false;
		}
	},
	css: [
		'./src/assets/styles/global.scss'
	]
};
