import { ENVIRONMENT_TOKEN } from './app.constants';
import { Environment } from './app.interfaces';
import { Controller, Get, Inject, Request, Response } from '@nestjs/common';
import { join, resolve } from 'path';

const { Builder, Nuxt } = require('nuxt');
const nuxtConfig = require(join(resolve(), 'nuxt.config.js'));

@Controller()
export class NuxtController
{
	nuxt:any;

	constructor(@Inject(ENVIRONMENT_TOKEN) private readonly config:Environment)
	{
		this.nuxt = new Nuxt(nuxtConfig);

		// Build only in dev mode
		if (this.config.name === 'development')
		{
			const builder = new Builder(this.nuxt);
			builder.build();
		}
		else
		{
			this.nuxt.ready();
		}

	}

	@Get('*')
	async root(@Request() req:any, @Response() res:any)
	{
		if (this.nuxt)
		{
			return await this.nuxt.render(req, res);
		}
		else
		{
			res.send('Nuxt is disabled.');
		}
	}
}
