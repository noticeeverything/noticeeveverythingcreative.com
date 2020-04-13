export function apiError(e:Error):{ success:boolean, message?:string }
{
	return { success: false, message: e.message };
}

export function apiData<D = any>(data?:D):{ success:boolean, message?:string, data?:D }
{
	return { success: true, data };
}
