import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/projects')
export class ProjectController
{
	@Post('meta')
	async GetMeta()
	{
		return {
			title: 'Notice Everything Creative | Projects',

			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content: 'TODO'
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: 'custom software,web development,reno, nv, nevada, small business,custom website'
				}
			]
		};
	}

	@Post('meta/:id')
	async GetProjectMeta(@Body() body:any)
	{
		return {
			title: `Notice Everything Creative | ${ body.name }`,

			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content: `${ body.name } by Notice Everything Creative. ${ body.description }`
				},
				{
					hid: 'og:image',
					name: 'og:image',
					content: body.image.fields.file.url
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: 'custom software,web development,reno, nv, nevada, small business,custom website'
				}
			]
		};
	}
}
