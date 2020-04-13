import { Component, Vue } from 'vue-property-decorator';

Component.registerHooks(['asyncData', 'head']);

@Component({})
export default class Contact extends Vue
{
	valid = true;

	loading = false;

	name = '';

	nameRules = [
		(v:string) => !!v || 'Name is required',
		(v:string) => (v && v.length <= 35) || 'Name must be less than 35 characters'
	];

	response = '';

	email = '';

	emailRules = [
		(v:string) => !!v || 'E-mail is required',
		(v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
	];

	message = '';

	messageRules = [
		(v:string) => !!v || 'Message is required'
	];

	snackbar = false;

	$refs!:{
		form:HTMLFormElement
	};

	env = this.$nuxt.context.env;

	get formValue():{ name:string, email:string, message:string, 'form-name':'noticeeverything' }
	{
		return {
			name: this.$data.name,
			email: this.$data.email,
			message: this.$data.message,
			'form-name': 'noticeeverything'
		};
	}

	head()
	{
		return {
			title: 'Notice Everything Creative | Contact',
			meta: [
				{
					description: 'Contact Notice Everything Creative about your custom software and web development ' +
						'needs. We specialize in custom full-stack JavaScript web, mobile and desktop applications.',
					'og:title': 'Notice Everything Creative | Contact',
					'og:description': 'Contact Notice Everything Creative about your custom software and web ' +
						'development needs. We specialize in custom full-stack JavaScript web, mobile and desktop ' +
						'applications.'
				}
			]
		};
	}

	submit()
	{
		if (!this.$refs.form.validate())
		{
			this.response = `Please correct form errors`;
			return this.snackbar = true;
		}

		this.loading = true;

		this.$axios({
			method: 'post',
			url: `${ this.env.apiHost }/contact`,
			data: this.formValue,
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) =>
			{
				this.loading = false;

				if (res.data.success)
				{
					this.response = `Success! Confirmation sent to ${ this.formValue.email }.`;
					this.$refs.form.reset();
				}
				else
				{
					this.response = res.data.message;
				}

				this.snackbar = true;
			})
			.catch((e:any) =>
			{
				this.loading = false;
				this.response = e.message || 'An unknown error occurred';
				this.snackbar = true;
			});
	}
}
