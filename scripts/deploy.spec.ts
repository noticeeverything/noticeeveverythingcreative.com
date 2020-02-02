describe('deploy', () =>
{
	describe('manual', () =>
	{
		let logError;
		let header;
		let annotate;

		beforeEach(() =>
		{
			logError = spyOn(require('scripts/shell-functions'), 'logError');
			header = spyOn(require('scripts/shell-functions'), 'header');
			annotate = spyOn(require('scripts/shell-functions'), 'annotate');
		});

		// This isn't terribly useful, but I haven't figured out how to mock the deploy script yet
		it('logs 3 errors given required arguments are undefined or invalid', async () =>
		{
			process.argv = ['--env=fake'];
			logError.and.returnValue(null);
			await require('scripts/deploy');
			expect(logError).toHaveBeenCalledTimes(2);
		});
	});
});
