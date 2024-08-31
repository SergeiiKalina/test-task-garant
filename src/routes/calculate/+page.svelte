<script>
	import { format } from 'svelte-i18n';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';
	export let data;
	let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	let numberOne = 0;
	let numberTwo = 0;
	let history = [];
	let result = 0;

	const convertData = (data) => {
		return data.map((item) => ({
			result: item.result,
			time: DateTime.fromISO(item.createdAt, { zone: timeZone }).toFormat('yyyy-MM-dd HH:mm')
		}));
	};

	onMount(() => {
		history = convertData(data.history);
	});

	const handleNumber = async (e) => {
		const res = await fetch('/api/calculate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ numberOne, numberTwo })
		});

		if (!res.ok) {
			alert($format('alert'));
		} else {
			const answer = await res.json();
			result = answer.result;
			history = convertData(answer.history);
		}
	};
</script>

<div class="container">
	<h1>{$format('calculate_header')}</h1>
	<form method="POST" action="/api/calculate" on:submit|preventDefault={handleNumber}>
		<label><input type="number" name="numberOne" bind:value={numberOne} /></label>
		<span>+</span>
		<label><input type="number" name="numberTwo" bind:value={numberTwo} /></label>
		<h2>{$format('calculate_result')}: {result}</h2>
		<button type="submit">{$format('calculate_button')}</button>
	</form>

	<h2>{$format('historyResults')}</h2>

	{#if history.length}
		<ul class="history-list">
			{#each history as item}
				<li class="history-item">
					<span class="data-label">{$format('data')}:</span>
					{item.time}
					<span class="result-label">{$format('result')}:</span>
					{item.result}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.history-list {
		list-style-type: none;
		padding: 0;
		margin: 20px 0;
	}

	.history-item {
		background-color: #f9f9f9;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 10px 15px;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.data-label,
	.result-label {
		font-weight: bold;
		margin: 0 2px 0 8px;
	}
	.container {
		height: 75vh;
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
		margin-bottom: 40px;
	}
</style>
