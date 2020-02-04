import { Environment } from '@/server/app/app.interfaces';
import { INestApplication } from '@nestjs/common';
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
		const site = `http${ Env.http.ssl ? 's' : '' }://${ Env.http.host }:${ Env.http.port }`;
		consola.ready({
			message: `Revelry and awe are afoot at ${ site }`,
			badge: true
		});
	});
}

bootstrap().catch(e =>
{
	consola.error({
		message: e.message,
		badge: true
	});
});
