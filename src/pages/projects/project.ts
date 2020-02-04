import { contentfulClientApi } from '@/plugins/contentful';
import { Component, Vue } from 'vue-property-decorator';

@Component({
	// TODO: this only works for a child component when placed in the @Component decorator options - why???
	asyncData: async (ctx:any) =>
	{
		const data = await contentfulClientApi.getEntries({
			content_type: 'project', 'fields.slug': ctx.params.project
		});

		const project = data.items[0];
		let error = undefined;
		if (!project)
		{
			error = `No project found with id "${ ctx.$route.params.project }"`;
			return {
				project,
				loading: false,
				error
			}
		}

		const meta = await ctx.$axios(<any>{
			method: 'post',
			url: `${ ctx.env.apiHost }/projects/meta/${ project.sys.id }`,
			headers: { 'Content-Type': 'application/json' },
			data: project.fields
		});

		return {
			project,
			loading: false,
			error,
			meta: meta.data
		}
	},
	head: ((ctx:any) => ctx.$data.meta) as any,
	data: () => ({
		error: undefined,
		loading: true,
		project: undefined
	})
})
export default class Project extends Vue {}
