import { prompt } from 'inquirer';
import moment from 'moment-timezone';

// noinspection JSDeprecatedSymbols

export class Inquirer
{
	// @ts-ignore
	static get tag():string
	{
		return moment().format('MM_DD_YYYY_HH_mm_ss');
	}

	async getTag():Promise<string>
	{
		return (await prompt<any>([
			{
				type: 'input',
				name: 'tag',
				message: 'what tag do you want to use for the Docker images (defaults to datetime)?',
				default: Inquirer.tag
			}
		])).tag;
	}
}
