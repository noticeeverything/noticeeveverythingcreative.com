import { Attachment } from 'nodemailer/lib/mailer';
import { emailConfig } from './email.config';

export function buildAttachments():Attachment[]
{
	const templateImagesPath = emailConfig.imagesDir,
		attachments:Attachment[] = [],
		tplConfig = emailConfig.template;

	if (tplConfig.headerImgFilename && tplConfig.headerImgCid)
	{
		attachments.push({
			filename: tplConfig.headerImgFilename,
			path: `${ templateImagesPath }/${ tplConfig.headerImgFilename }`,
			cid: emailConfig.template.headerImgCid
		});
	}

	for (const p in tplConfig.social)
	{
		if (tplConfig.social[p])
		{
			let abbr:string, include = false;
			switch (p)
			{
				case 'github':
					abbr = 'gh';
					include = tplConfig.social.github.include;
					break;
				case 'stackoverflow':
					abbr = 'so';
					include = tplConfig.social.stackoverflow.include;
					break;
				case 'linkedin':
					abbr = 'li';
					include = tplConfig.social.linkedin.include;
					break;
			}

			if (abbr && include)
				attachments.push({
					filename: `${ abbr }.png`,
					path: `${ templateImagesPath }/${ abbr }.png`,
					cid: `Embedded${ _capitalize(abbr) }Logo`
				});

			abbr = undefined;
			include = false;
		}
	}

	return attachments;
}

function _capitalize(str):string
{
	return str[0].toUpperCase() + str.substr(1);
}
