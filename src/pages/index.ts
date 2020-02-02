import { Component, Vue } from 'vue-property-decorator';

@Component({
	head: () => ({
		title: 'Notice Everything Creative | Custom Business Software Solutions in Reno, NV',
		meta: [
			// hid is used as unique identifier. Do not use `vmid` for it as it will not work
			{
				hid: 'description',
				name: 'description',
				content: 'Notice Everything Creative provides on-budget custom software solutions and web development ' +
					'for small businesses in Reno and around the world. We specialize in custom full-stack JavaScript' +
					'web, mobile and desktop applications.'
			},
			{
				hid: 'keywords',
				name: 'keywords',
				content: 'custom software,web development,reno, nv, nevada, small business,custom website'
			}
		]
	})
})
export default class Index extends Vue
{
}
