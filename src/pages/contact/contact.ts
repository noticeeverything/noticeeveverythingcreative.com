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

	async asyncData(ctx:any)
	{
		// fetch page meta from API
		try
		{
			const meta = await ctx.$axios(<any>{
				method: 'post',
				url: `${ ctx.env.apiHost }/contact/meta`,
				headers: { 'Content-Type': 'application/json' }
			});

			return { meta: meta.data };
		}
		catch (error)
		{
			// Redirect to error page or 404 depending on server response
			console.log('ERR: ', error);
		}
	}

	head()
	{
		return this.$data.meta;
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
