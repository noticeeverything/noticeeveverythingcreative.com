import { apiData, apiError } from '../../utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ContactMessage } from '../email/email.interfaces';
import { ContactService } from './contact.service';

@Controller('/api/contact')
export class ContactController
{
	constructor(private readonly contactService:ContactService) {}

	@Post()
	async Contact(@Body() body:ContactMessage)
	{
		try
		{
			const contact = await this.contactService.SendContactEmail(body);
			const confirmation = await this.contactService.SendConfirmationEmail(body);
			return apiData({ contact, confirmation });
		}
		catch (e)
		{
			return apiError(e);
		}
	}

	@Post('meta')
	async GetMeta()
	{
		return {
			title: 'Notice Everything Creative | Contact',

			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content: 'Contact Notice Everything Creative about your custom software and web development needs. ' +
						'We specialize in custom full-stack JavaScript web, mobile and desktop applications.'
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
