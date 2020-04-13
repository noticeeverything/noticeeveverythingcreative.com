import { mount } from '@vue/test-utils';
import Navigation from '@/components/navigation/navigation';

describe('nav', () =>
{
	const component = mount(Navigation, {
		stubs: ['router-link', 'nuxt-link'],
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
