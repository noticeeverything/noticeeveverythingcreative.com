export function apiError(e:Error):{ success:boolean, message?:string }
{
	let msg:string;
	const mongoDupRegex = /^E11000/;

	if (e.message && mongoDupRegex.test(e.message))
	{
		const parsedMsg = parseDuplicateKeyMsg(e.message);
		msg = `A document already exists in the "${ parsedMsg.collection }" collection with identical values for ` +
			`the fields "${ parsedMsg.indexedProperties.join(', ') }"`;
	}
	else
	{
		msg = e.message;
	}

	return { success: false, message: msg };
}

export function apiData<D = any>(data?:D):{ success:boolean, message?:string, data?:D }
{
	return { success: true, data };
}

/**
 * Parses Mongoose's duplicate key error message into collection, properties and values
 * @private
 * @param msg
 */
function parseDuplicateKeyMsg(msg:string):{ collection:string, indexedProperties:string[], values:string[] }
{
	const collection = msg
			.substring(msg.indexOf('collection:'), msg.indexOf(' index'))
			.replace(/collection:.+\./, ''),
		indexedProperties = msg
			.substring(msg.indexOf('index:'), msg.indexOf(' dup key:'))
			.replace('index: ', '')
			.replace(/_1_/gi, ' ')
			.replace(/_1$/, '')
			.split(' '),
		values = msg
			.substring(msg.indexOf('{'), msg.indexOf('}'))
			.replace('{', '')
			.replace('}', '')
			.replace(/"/gi, '')
			.split(',:')
			.map(x => x.trim());

	return { collection, indexedProperties, values };
}

