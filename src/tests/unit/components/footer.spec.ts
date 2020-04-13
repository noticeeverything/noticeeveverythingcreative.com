import { mount } from '@vue/test-utils';
import Footer from '@/components/footer/footer';

describe('footer', () =>
{
	const component = mount(Footer, {
		mocks: {
			$route: {
				path: '/some/path'
			}
		}
	});

	it('works', () =>
	{
		expect(component.isVueInstance()).toBeTruthy();
	});
});
