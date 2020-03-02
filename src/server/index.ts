import { Environment } from './app/app.interfaces';
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as config from 'config';
import { join, resolve } from 'path';
import { AppModule } from './app/app.module';

const consola = require('consola');
const morgan = require('morgan');
const compression = require('compression');

async function bootstrap()
{
	const Env = config as Environment;
	const app = await NestFactory.create<INestApplication&NestExpressApplication>(AppModule);

	app.use(morgan('dev'));
	app.use(compression());
	app.useStaticAssets(join(resolve(), '.nuxt'));

	// Listen the server
	await app.listen(Env.http.port, () =>
	{
		Logger.log(`Revelry and awe are afoot at http${ Env.http.ssl ? 's' : '' }://` +
			`${ Env.http.host }:${ Env.http.port }`);

		const configSources = config.util.getConfigSources().map(s => s.name.split('/').pop()).join(', ');
		Logger.log(`Configuration sources: ${ configSources }`, 'ApplicationConfig');
		Logger.log(
			`Using ${ config.get('name') } config in ${ process.env.NODE_ENV } mode`,
			'ApplicationConfig'
		);
	});
}

bootstrap().catch(e =>
{
	consola.error({
		message: e.message,
		badge: true
	});
});
