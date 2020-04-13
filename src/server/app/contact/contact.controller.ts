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
}
