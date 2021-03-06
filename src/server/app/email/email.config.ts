import { Environment } from '../app.interfaces';
import { join, resolve } from 'path';
import * as config from 'config';

const templateDir = join(resolve(), 'src/server/app/email');
const Env = config as Environment;

export const emailConfig = {
	smtpOptions: Env.email.smtpOptions,
	from: 'Notice Everything <hello@noticeeverything.com>',
	to: 'Notice Everything <hello@noticeeverything.com>',
	sender: 'Notice Everything <hello@noticeeverything.com>',
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
			email: 'hello@noticeeverything.com'
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
