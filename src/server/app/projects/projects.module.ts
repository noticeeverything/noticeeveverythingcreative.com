import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { ProjectController } from './project.controller';

@Module({
	imports: [EmailModule],
	controllers: [ProjectController]
})
export class ProjectsModule {}
