export async function load({ fetch }) {
	const res = await fetch('/api/calculate', {
		method: 'GET'
	});

	if (!res.ok) {
		return {
			status: res.status,
			error: new Error('Failed to load data')
		};
	}
	const data = await res.json();

	return data;
}
