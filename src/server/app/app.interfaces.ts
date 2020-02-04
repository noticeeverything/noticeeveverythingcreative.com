import * as config from 'config';

export interface Environment extends config.IConfig
{
	email: {
		smtpOptions: {
			host:string;
			port:number;
			secure:boolean;
			auth: {
				user:string;
				pass:string;
			}
		}
	};

	http: {
		host:string;
		port:number;
		ssl:boolean;
	};

	name:string;
}
