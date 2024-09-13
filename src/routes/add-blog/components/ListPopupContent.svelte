<script>
	import { toggleListPopup, value } from '../store.js';
	let inputList = ['item-1'];

	const addList = (e) => {
		const listArr = [];
		const form = new FormData(e.target);
		for (const [key, value] of form.entries()) {
			listArr.push(value);
		}
		$value = [
			...$value,
			{
				tag: `<ul>...</ul>`,
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
<button
	on:click={() => {
		inputList = [...inputList, `item-${inputList.length + 1}`];
	}}>+</button
>
<form class="block-list" on:submit={addList}>
	{#each inputList as item}
		<label>{item}<input type="text" name={item} /></label>
	{/each}

	<button type="submit"> ADD All list</button>
</form>

<style>
	.block-list {
		display: flex;
		flex-direction: column;
	}
	.button-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
</style>
