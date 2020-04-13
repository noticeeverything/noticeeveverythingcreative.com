import { ENVIRONMENT_TOKEN } from '../app/app.constants';
import { Module } from '@nestjs/common';
import { NuxtController } from './nuxt.controller';
import { ContactModule } from './contact/contact.module';
import * as config from 'config';

@Module({
	imports: [ContactModule],
	controllers: [NuxtController],
	providers: [
		{ provide: ENVIRONMENT_TOKEN, useValue: config }
	]
})
export class AppModule {}
