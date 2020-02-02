export type TemplateType = 'contact'|'contact-confirmation';

export interface ContactMessage
{
	name:string;
	email:string;
	message:string;
}
