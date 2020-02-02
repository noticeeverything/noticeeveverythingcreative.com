export const isString = function(arg:any)
{
	return typeof arg === 'string';
};

export const isObject = function(arg:any)
{
	return arg && typeof arg === 'object';
};

/**
 * Simple helper to make turning a list of things into a grammatically correct list of things.
 *
 * Useful in keeping validation errors up to date with option-lists (without breaking single source of truth)
 * e.g. `listInSentence('or', 'one', 'two', 'three')` => `"one, two, or three"`
 * e.g. `listInSentence('and', 'one', 'two')` => `"one and two"`
 *
 * If you don't need the 'and' or 'or', don't use this function, just use `items.join(', ')`.
 *
 * @param listType prepend the sentence with 'and' or 'or'
 * @param items join these as a comma separated list in a sentence
 *
 */
export function listInSentence(listType:'and'|'or', ...items:any[]):string
{
	const sep = items.length > 2 ? ', ' : '';
	const prependLast = items.length > 1 ? listType + ' ' : '';
	const iLast = items.length - 1;
	if (prependLast) items[iLast] = prependLast + items[iLast];
	return items.join(sep);
}

export function isNullOrUndefined(v:any):boolean
{
	return v === null || v === undefined;
}
