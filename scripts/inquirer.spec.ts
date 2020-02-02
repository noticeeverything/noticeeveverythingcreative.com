import { Inquirer as IInquirer } from '~/scripts/inquirer';
import { Inquirer } from './inquirer';

describe('Inquirer', () =>
{
	let prompt:any;
	let inquirer:Inquirer;

	beforeEach(() =>
	{
		inquirer = new Inquirer();
		prompt = spyOn<IInquirer>(require('~/scripts/inquirer'), 'prompt');
	});

	it('creates', () =>
	{
		expect(inquirer).toBeTruthy();
	});
});
