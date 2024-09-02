import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
	translations: {
		en: { lang },
		'uk-UA': { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'header',
			loader: async () => (await import('./en/header.json')).default
		},
		{
			locale: 'uk-UA',
			key: 'header',
			loader: async () => (await import('./uk-UA/header.json')).default
		},
		{
			locale: 'en',
			key: 'footer',
			loader: async () => (await import('./en/footer.json')).default
		},
		{
			locale: 'uk-UA',
			key: 'footer',
			loader: async () => (await import('./uk-UA/footer.json')).default
		},
		{
			locale: 'en',
			key: 'home',
			routes: ['', '/'],
			loader: async () => (await import('./en/home.json')).default
		},
		{
			locale: 'uk-UA',
			key: 'home',
			routes: ['', '/'],
			loader: async () => (await import('./uk-UA/home.json')).default
		},
		{
			locale: 'en',
			key: 'about',
			routes: ['/about'],
			loader: async () => (await import('./en/about.json')).default
		},
		{
			locale: 'uk-UA',
			key: 'about',
			routes: ['/about'],
			loader: async () => (await import('./uk-UA/about.json')).default
		},
		{
			locale: 'en',
			key: 'calculate',
			routes: ['/calculate'],
			loader: async () => (await import('./en/calculate.json')).default
		},
		{
			locale: 'uk-UA',
			key: 'calculate',
			routes: ['/calculate'],
			loader: async () => (await import('./uk-UA/calculate.json')).default
		},
		{
			locale: 'en',
			key: 'global',
			routes: ['/calculate'],
			loader: async () => (await import('./en/global.json')).default
		},
		{
			locale: 'uk-UA',
			key: 'global',
			routes: ['/calculate'],
			loader: async () => (await import('./uk-UA/global.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(async ($loading) => {
	if ($loading) {
		await loading.toPromise();
	}
});
