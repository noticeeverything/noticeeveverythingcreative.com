import { Module } from '@nestjs/common';
import { NecNestNodemailerModule } from '@noticeeverything/nest';
import { NecEmailService } from './nec-email.service';
import { emailConfig } from './email.config';

@Module({
	imports: [NecNestNodemailerModule.forRoot(emailConfig)],
	providers: [NecEmailService],
	exports: [NecEmailService]
})
export class EmailModule
{
}
