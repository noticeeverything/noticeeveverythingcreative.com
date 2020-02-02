import { Controller, Get, Request, Response } from '@nestjs/common';
import { Request as IRequest, Response as IResponse } from 'express';
import { join, resolve } from 'path';
const { Builder, Nuxt } = require('nuxt');
const nuxtConfig = require(join(resolve(), 'nuxt.config.js'));

@Controller()
export class NuxtController
{
	nuxt:any;

	constructor()
	{
		if (process.env.NODE_ENV === 'production')
		{
			nuxtConfig.dev = false;
			this.nuxt = new Nuxt(nuxtConfig);
		}
		else
		{
			this.nuxt = new Nuxt(nuxtConfig);
			new Builder(this.nuxt).build();
		}
	}

	@Get('*')
	async Index(@Request() req:IRequest, @Response() res:IResponse)
	{
		await this.nuxt.render(req, res);
	}
}
