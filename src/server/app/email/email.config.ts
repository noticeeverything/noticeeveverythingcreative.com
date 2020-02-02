import { join, resolve } from 'path';
const config = require('config');

const templateDir = process.env.NODE_ENV === 'production' ?
	join(resolve(), '.nuxt/server/app.email') :
	join(resolve(), 'src/server/app/email');

export const emailConfig = {
	smtpOptions: config.email.smtpOptions,
	from: 'Notice Everything <info@noticeeverythingcreative.com>',
	to: 'Notice Everything <info@noticeeverythingcreative.com>',
	sender: 'Notice Everything <info@noticeeverythingcreative.com>',
	templateDir,
	viewsDir: join(templateDir, 'views'),
	imagesDir: join(templateDir, 'img'),
	send: true,
	extension: 'ejs',
	juice: true,
	template: {
		headerImgFilename: null,
		headerImgCid: null,
		company: {
			name: 'Notice Everything',
			email: 'info@noticeeverythingcreative.com'
		},
		excludeSocialLinks: false,
		social: {
			github: {
				include: true,
				link: 'https://github.com/noticeeverything'
			},
			stackoverflow: {
				include: true,
				link: 'https://stackoverflow.com/users/3127799/mycompassspins'
			},
			linkedin: {
				include: true,
				link: 'https://www.linkedin.com/in/justin-mcmahon-8722335/'
			}
		}
	}
};
