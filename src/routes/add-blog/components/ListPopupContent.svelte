<script>
	import { toggleListPopup, value } from '../store.js';
	let inputList = ['item-1'];
	let isNumeric = false;

	const addList = (e) => {
		const listArr = [];
		const form = new FormData(e.target);
		for (const [key, value] of form.entries()) {
			listArr.push(value);
		}
		$value = [
			...$value,
			{
				tag: isNumeric ? `<ol>...</ol>` : `<ul>...</ul>`,
				content: `${listArr.map((el) => `<li>${el}</li>`).join('')}`
			}
		];
		$toggleListPopup = false;
	};
</script>

<button
	class="button-popup-close"
	type="button"
	on:click={() => {
		$toggleListPopup = false;
	}}>X</button
>
<h2>Add List</h2>
<section class="numeric-button">
	<button
		on:click={() => {
			isNumeric = true;
		}}>numeric</button
	><button
		on:click={() => {
			isNumeric = false;
		}}>not numeric</button
	>
</section>

<form class="block-list" on:submit={addList}>
	{#each inputList as item}
		<label>{item}<input type="text" name={item} /></label>
	{/each}
	<button
		type="button"
		class="add-field"
		on:click={() => {
			inputList = [...inputList, `item-${inputList.length + 1}`];
		}}>+</button
	>
	<button type="submit"> ADD All list</button>
</form>

<style>
	button[type='submit'] {
		margin-top: 12px;
	}
	.add-field {
		margin-top: 8px;
	}
	form {
		margin-top: 8px;
	}
	.numeric-button {
		width: 20%;
		display: flex;
		justify-content: space-between;
	}
	.block-list {
		display: flex;
		flex-direction: column;
	}
	label {
		margin: 4px 0;
	}
	input {
		margin-left: 5px;
	}
	.button-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
</style>
