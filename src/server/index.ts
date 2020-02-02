import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';

const config = require('config');
const consola = require('consola');
const morgan = require('morgan');

async function bootstrap()
{
	const app = await NestFactory.create<INestApplication&NestExpressApplication>(AppModule);

	app.use(morgan('dev'));

	// Listen the server
	await app.listen(config.http.port, () =>
	{
		const site = `http${ config.http.ssl ? 's' : '' }://${ config.http.host }:${ config.http.port }`;
		consola.ready({
			message: `Revelry and awe are afoot at ${ site }`,
			badge: true
		});
	});
}

bootstrap().catch(e => consola.error({
	message: e.message,
	badge: true
}));
