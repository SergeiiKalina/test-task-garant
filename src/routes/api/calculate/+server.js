import { json } from '@sveltejs/kit';
import { historyStore } from './store.js';
import { get } from 'svelte/store';

export async function POST(event) {
	const body = await event.request.json();
	const numberOne = body.numberOne;
	const numberTwo = body.numberTwo;

	const result = +numberOne + +numberTwo;
	const isValidResult = typeof result === 'number';
	if (isValidResult) {
		const now = new Date();
		const createdAt = now.toISOString();

		historyStore.update((history) => {
			return [...history, { result, createdAt }];
		});

		return json({ history: get(historyStore), result });
	} else {
		return new Response(JSON.stringify({ error: 'Data not correct' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}

export async function GET() {
	const history = get(historyStore);
	return new Response(JSON.stringify({ history }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
