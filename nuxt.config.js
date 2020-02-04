const cfConfig = require('./.contentful.json');
const gSiteVerification = require('./.google.json');

module.exports = {
	mode: 'universal',
	srcDir: './src',
	rootDir: './',
	modules: ['@nuxtjs/axios'],
	server: {
		port: 3002, // default: 3000,
	},
	axios: {
		baseURL: 'http://localhost:3002'
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
			gSiteVerification
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
			{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Poiret+One&display=swap' }
		]
	},
	env: {
		apiHost: process.env.NODE_ENV === 'production' ?
			'https://www.noticeeverythingcreative.com/api' :
			'http://localhost:3002/api',
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
