import * as moment from 'moment';

export function dateRangeOverlaps(
	startDateA:string,
	endDateA:string,
	startDateB:string,
	endDateB:string
):boolean
{
	for (let i = 0; i < arguments.length; i++)
	{
		if (!moment(new Date(arguments[i])).isValid())
			throw new Error(`${ arguments[i] } cannot be parsed as a date`);
	}

	const startA = moment(new Date(startDateA)),
		startB = moment(new Date(startDateB)),
		endA = moment(new Date(endDateA)),
		endB = moment(new Date(endDateB));

	// b starts in a
	if (startA.isSameOrBefore(startB) && startB.isSameOrBefore(endA)) return true;

	// b ends in a
	if (startA.isSameOrBefore(endB) && endB.isSameOrBefore(endA)) return true;

	// a in b
	return startB.isSameOrBefore(startA) && endA.isSameOrBefore(endB);
}

export function dateIsBetween(
	comparatorDate:string,
	startDate:string,
	endDate:string
):boolean
{
	for (let i = 0; i < arguments.length; i++)
	{
		if (!moment(new Date(arguments[i])).isValid())
			throw new Error(`${ arguments[i] } cannot be parsed as a date`);
	}

	const cDate = moment(new Date(comparatorDate)),
		sDate = moment(new Date(startDate)),
		eDate = moment(new Date(endDate));

	if (eDate.isSameOrBefore(sDate))
		throw new Error('The endDate argument should be > the startDate argument');

	return cDate.isBetween(sDate, eDate, 'day', '[]');
}
