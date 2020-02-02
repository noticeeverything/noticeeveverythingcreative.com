const necComDeploy = require('../deploy').default;

export interface Arguments
{
	awsRegion?:string;
	errors:string[];
	tag:string;
}

export type Environment = 'stage'|'prod';

export type ProjectName = 'nec-com';
export type ProjectHost = 'noticeeverythingcreative.com';
export type ProjectRoot = 'apps/nec-com';

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
	host:ProjectHost;
	projectName:ProjectName;
	projectRoot:ProjectRoot;
}

export class Project
{
	deploySteps:DeployStep[];

	host:ProjectHost;

	projectName:ProjectName;

	projectRoot:ProjectRoot;

	constructor(name:ProjectName)
	{
		this.projectName = name;
		this.deploySteps = ProjectDeployStepsMap.get(this.projectName) as DeployStep[];
		this.projectRoot = ProjectRootMap.get(this.projectName) as ProjectRoot;
		this.host = ProjectHostMap.get(this.projectName) as ProjectHost;
	}
}

export const ProjectHostMap = new Map<ProjectName, ProjectHost>([
	['nec-com', 'noticeeverythingcreative.com']
]);

export const ProjectRootMap = new Map<ProjectName, ProjectRoot>([
	['nec-com', 'apps/nec-com']
]);

export const ProjectDeployStepsMap = new Map<ProjectName, DeployStep[]>([
	['nec-com', necComDeploy]
]);
