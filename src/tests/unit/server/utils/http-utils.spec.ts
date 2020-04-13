import { apiData } from '@/server/utils';

describe('Http Response Helpers', () =>
{
	describe('apiData', () =>
	{
		it('returns a null data property given data argument is not passed', () =>
		{
			const res = apiData({ someProp: true });
			expect(res).toStrictEqual({
				success: true,
				data: { someProp: true }
			});
		});

		it('returns provided data', () =>
		{
			const res = apiData([1, 2, 3]);
			expect(res).toStrictEqual({
				success: true,
				data: [1, 2, 3]
			});
		});
	});
});
