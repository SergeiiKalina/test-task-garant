<script>
	import { toggleListPopup, value } from '../store.js';

	let inputList = [{ id: 'item-1' }];
	let isNumeric = false;

	const addList = () => {
		$value = [
			...$value,
			{
				tag: isNumeric ? `<ol>...</ol>` : `<ul>...</ul>`,
				content: `${inputList.map((el, index) => `<li data-index="${index}">${el.content}</li>`).join('')}`
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
	{#each inputList as item, index}
		<label
			>{item.id}<input type="text" name={item.id} bind:value={inputList[index].content} />
		</label>
	{/each}
	<button
		type="button"
		class="add-field"
		on:click={() => {
			inputList = [...inputList, { id: `item-${inputList.length + 1}` }];
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
