import { Injectable, Logger } from '@nestjs/common';
import { EmailService, IEmailService, MailResponse } from '@noticeeverything/nest';
import { TemplateType } from '@/server/app/email/email.interfaces';
import { emailConfig } from './email.config';
import { buildAttachments } from './email.utils';

@Injectable()
export class NecEmailService
{
	constructor(@EmailService private readonly emailService:IEmailService)
	{
	}

	async Send(
		to:string,
		type:TemplateType,
		data:any
	):Promise<MailResponse>
	{
		try
		{
			const locals = {
				attachments: buildAttachments(),
				config: emailConfig.template,
				data,
				from: emailConfig.from,
				sender: emailConfig.sender,
				to: to
			};

			const mailResponse = await this.emailService.Send(type, locals);
			Logger.warn(`emailed "${ type }" to ${ to }`, 'ContactService');
			return mailResponse;
		}
		catch (e)
		{
			Logger.error(e.message, `email "${ type }" to ${ to } failed`, 'ContactService');
			throw e;
		}
	}
}
