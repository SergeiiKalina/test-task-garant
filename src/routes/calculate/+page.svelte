<script>
	import { t } from '../../i18n.js';
	let numberOne = 0;
	let numberTwo = 0;
	let result = 0;
	const handleNumber = async (e) => {
		const res = await fetch('/api/calculate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ numberOne, numberTwo })
		});
		const sum = await res.json();
		result = sum;
	};
</script>

<div>
	<h1>{t('calculate.header')}</h1>
	<form method="POST" action="/api/calculate" on:submit|preventDefault={handleNumber}>
		<label><input type="number" name="numberOne" bind:value={numberOne} /></label>
		<span>+</span>
		<label><input type="number" name="numberTwo" bind:value={numberTwo} /></label>
		<h2>{t('calculate.result')}: {result}</h2>
		<button type="submit">{t('calculate.button')}</button>
	</form>
</div>

<style>
	div {
		height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	form {
		height: 120px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
