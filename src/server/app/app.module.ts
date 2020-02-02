import { ProjectsModule } from './projects/projects.module';
import { Module } from '@nestjs/common';
import { NuxtController } from './nuxt.controller';
import { ContactModule } from './contact/contact.module';

@Module({
	imports: [ContactModule, ProjectsModule],
	controllers: [NuxtController]
})
export class AppModule {}
