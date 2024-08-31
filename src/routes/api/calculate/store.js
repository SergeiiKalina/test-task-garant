import { writable } from 'svelte/store';

export const historyStore = writable([
	{ result: 5, createdAt: new Date(Date.now() - 3600000).toISOString() },
	{ result: 10, createdAt: new Date(Date.now() - 7200000).toISOString() }
]);
