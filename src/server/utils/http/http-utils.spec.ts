import { apiData, apiError } from './index';

describe('Http Response Helpers', () =>
{
	describe('apiError', () =>
	{
		it('parses a Mongo duplicate key (E11000) message given index only on _id field', () =>
		{
			const res = apiError({
				name: 'MongoError',
				message: 'E11000 duplicate key error collection: my-db.my_collection index: _id_1 dup key: { : "someId" }'
			});

			expect(res).toStrictEqual({
				success: false,
				message: 'A document already exists in the "my_collection" collection with identical values for the ' +
					'fields "_id"'
			});
		});

		it('parses a Mongo duplicate key (E11000) message given a compound index', () =>
		{
			const res = apiError({
				name: 'MongoError',
				message: 'E11000 duplicate key error collection: my-db.my_collection index: ' +
					'field1_1_field2_1_field3_1 dup key: { : "field1Val", : "field2Val", : "field3Val" }'
			});

			expect(res).toStrictEqual({
				success: false,
				message: 'A document already exists in the "my_collection" collection with identical values for the ' +
					'fields "field1, field2, field3"'
			});
		});

		it('returns an api error with the message given error is not a MongoError E11000', () =>
		{
			const res = apiError({
				name: 'TypeError',
				message: 'Foobar!'
			});

			expect(res).toStrictEqual({
				success: false,
				message: 'Foobar!'
			});
		});
	});

	describe('apiData', () =>
	{
		it('returns a null data property given data argument is not passed', () =>
		{
			const res = apiData();
			expect(res).toStrictEqual({
				success: true,
				data: null
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
