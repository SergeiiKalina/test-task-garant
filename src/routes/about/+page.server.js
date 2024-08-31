import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function load() {
	const key = import.meta.env.VITE_ACCESS;
	if (!key || dev || key !== 'ACCESS_PROD') {
		throw redirect(307, '/');
	}

	return {};
}
