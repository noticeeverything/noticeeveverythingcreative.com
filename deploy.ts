import { ECR_REPO, SSH_USER } from './scripts/deploy.constants';
import { DeployStep } from './scripts/deploy.interfaces';
import { awsLogin, getDocker } from './scripts/shell-functions';

export default <DeployStep[]>[
	{
		name: 'Build',
		description: 'Test/Build',
		commands: [{ type: 'string', cmd: 'yarn build.prod' }]
	},
	{
		name: 'Copy',
		description: 'Copy email assets to build directory',
		commands: [
			{ type: 'string', cmd: 'cp -R src/server/app/email/views .nuxt/server/app/email' },
			{ type: 'string', cmd: 'cp -R src/server/app/email/img .nuxt/server/app/email' },
			{ type: 'string', cmd: 'cp -R src/server/app/email/styles .nuxt/server/app/email' },
			{ type: 'string', cmd: 'cp -R src/static .nuxt' }
		]
	},
	{
		name: 'Clean',
		description: 'Clean dist directory',
		commands: [
			{ type: 'string', cmd: 'find ".nuxt/server" -name "*.js.map" -type f -delete' }
		]
	},
	{
		name: 'Docker Build',
		description: 'Build/Push Docker image',
		commands: [
			{
				type: 'fn',
				fn: (tag:string) =>
				{
					getDocker();
					return `docker build -t ${ ECR_REPO } . && ` +
						`docker tag "${ ECR_REPO }" "${ ECR_REPO }:${ tag }" && ` +
						`docker tag "${ ECR_REPO }" "${ ECR_REPO }:latest"`;
				}
			},
			{
				type: 'fn',
				fn: async (tag:string) =>
				{
					await awsLogin();
					return `docker push ${ ECR_REPO }:${ tag } && docker push ${ ECR_REPO }:latest`;
				}
			}
		]
	},
	{
		name: 'SSH',
		description: 'Copy scripts to server and run',
		commands: [
			{
				type: 'fn',
				fn: (tag:string) => `scp "container_start.sh" "${ SSH_USER }:Applications/noticeeverythingcreative.com" && ` +
					`scp "docker-compose.yml" "${ SSH_USER }:Applications/noticeeverythingcreative.com" &&` +
					`ssh "${ SSH_USER }" "cd ./Applications/noticeeverythingcreative.com; chmod +x ./container_start.sh;` +
					`./container_start.sh --tag=${ tag }"`
			}
		]
	},
	{
		name: 'Git',
		description: 'Create/push git tags',
		commands: [
			{
				type: 'string',
				cmd: 'git tag deployed-nec-com -f'
			},
			{ type: 'string', cmd: 'git push --tags -f' }
		]
	}
];
