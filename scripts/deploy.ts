import { cd, pwd } from 'shelljs';
import { Arguments, Project } from './deploy.interfaces';
import { Inquirer } from './inquirer';
import { annotate, header, logError } from './shell-functions';

/**
 * Interactive - simply run `yarn deploy` and follow the prompts
 * Manual - e.g., `yarn deploy --projectName=api --env=stage`
 *
 * Arguments for manual deployment
 * @param project:ProjectName (required)
 * @param env:Environment (required)
 * @param awsProfile?:string (optional - defaults to 'default')
 * @param tag?:string (optional - defaults to datetime))
 */
(async function main()
{
	const args = process.argv.filter(a => /--(?:env|awsProfile|awsRegion|tag)/.test(a));
	const rootDir = pwd().stdout;
	let tag;
	const project = new Project('nec-com');

	// Deploy a single project - requires env, project, passphrase arguments
	// Non-interactive for later CI/CD purposes
	if (args.length)
	{
		const parsed = parseArguments(args);
		if (parsed.errors.length) return parsed.errors.map(e => logError(e));
		tag = parsed.tag;
	}
	// Interactive deployment - choose project(s), environment, etc.
	else
	{
		const inquirer = new Inquirer();
		tag = await inquirer.getTag();
	}

	// Some Projects will cd into their own root directory
	// Make sure we're at the project root when we start each one
	cd(rootDir);

	header(`Deploying ${ project.projectName }`);

	for (const step of project.deploySteps)
	{
		header(step.description);

		for (const command of step.commands)
		{
			const c = command as any;
			if (command.type === 'string')
			{
				await annotate(c.cmd);
			}
			else
			{
				const cmd = await c.fn(tag);
				annotate(cmd);
			}
		}
	}
})();

function parseArguments(args:any[]):Arguments
{
	const errors:string[] = [];
	let awsRegion;
	let tag;

	const hasAwsRegion = args.find(a => a.indexOf('--awsRegion=') > -1);
	if (hasAwsRegion)
	{
		awsRegion = args.find(a => a.indexOf('--awsRegion=') > -1)
			.replace('--awsRegion=', '');
	}

	const hasTag = args.find(a => a.indexOf('--tag=') > -1);
	if (!hasTag)
	{
		tag = Inquirer.tag;
	}
	else
	{
		tag = args.find(a => a.indexOf('--tag=') > -1).replace('--tag=', '');
	}

	return { awsRegion, tag, errors };
}
