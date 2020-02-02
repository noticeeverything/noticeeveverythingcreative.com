import { Component, Vue } from 'vue-property-decorator';
import { contentfulClientApi } from '@/plugins/contentful';
Component.registerHooks(['asyncData', 'head']);

@Component({})
export default class Projects extends Vue
{
	loading = true;

	async asyncData(ctx:any)
	{
		const data = await contentfulClientApi.getEntries({
			content_type: ctx.env.CTF_PROJECT_TYPE_ID,
			order: 'fields.sortOrder'
		});

		const meta = await ctx.$axios(<any>{
			method: 'post',
			url: `${ ctx.env.apiHost }/projects/meta`,
			headers: { 'Content-Type': 'application/json' }
		});

		return {
			projects: data.items,
			meta: meta.data,
			loading: false
		};
	}

	head()
	{
		return this.$data.meta;
	}
}
