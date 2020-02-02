import { Injectable } from '@nestjs/common';
import { MailResponse } from '@noticeeverything/nest';
import { ContactMessage } from '../email/email.interfaces';
import { emailConfig } from '../email/email.config';
import { NecEmailService } from '../email/nec-email.service';

@Injectable()
export class ContactService
{
	constructor(private readonly emailService:NecEmailService) {}

	async SendConfirmationEmail(data:ContactMessage):Promise<MailResponse>
	{
		return await this.emailService.Send(data.email, 'contact-confirmation', data);
	}

	async SendContactEmail(data:ContactMessage):Promise<MailResponse>
	{
		return await this.emailService.Send(emailConfig.to, 'contact', data);
	}
}
