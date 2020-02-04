import { ENVIRONMENT_TOKEN } from '@/server/app/app.constants';
import { ProjectsModule } from './projects/projects.module';
import { Module } from '@nestjs/common';
import { NuxtController } from './nuxt.controller';
import { ContactModule } from './contact/contact.module';
import * as config from 'config';

@Module({
	imports: [ContactModule, ProjectsModule],
	controllers: [NuxtController],
	providers: [
		{ provide: ENVIRONMENT_TOKEN, useValue: config }
	]
})
export class AppModule {}
