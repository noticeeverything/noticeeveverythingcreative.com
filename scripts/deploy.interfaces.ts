const necComDeploy = require('../deploy').default;

export interface Arguments
{
	awsRegion?:string;
	errors:string[];
	tag:string;
}

export type Environment = 'stage'|'prod';

export type ProjectName = 'nec-com';

export type DeployFunction = (tag:string) => string;

export interface Command
{
	cmd?:string;
	fn?:DeployFunction;
	type:'string'|'fn';
}

export interface DeployStep
{
	commands:Command[];
	description:string;
	name:string;
}

export interface Project
{
	deploySteps:DeployStep[];
	projectName:ProjectName;
}

export class Project
{
	deploySteps:DeployStep[];

	constructor(name:ProjectName)
	{
		this.projectName = name;
		this.deploySteps = necComDeploy;
	}
}
