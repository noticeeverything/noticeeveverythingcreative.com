export interface ContactData
{
	email:string;
	emailRules:((v:string) => string|boolean)[];
	loading:boolean;
	message:string;
	messageRules:((v:string) => string|boolean)[];
	name:string;
	nameRules:((v:string) => string|boolean)[];
	response?:string;
	snackbar:boolean;
	valid:boolean;
}
