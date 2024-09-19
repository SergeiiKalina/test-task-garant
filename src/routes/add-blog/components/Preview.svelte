<script>
	import { value } from '../store.js';
	import BlogBlock from './BlogBlock.svelte';
	let draggedIndex = null;

	function handleDragStart(e, index) {
		if (index === 0 || index === 1) return;
		draggedIndex = index;
		e.dataTransfer.effectAllowed = 'move';
	}

	function handleDrop(e, index) {
		e.preventDefault();
		if (index === 0 || index === 1) {
			draggedIndex = null;
		}
		if (draggedIndex !== null && draggedIndex !== index) {
			const draggedItem = $value[draggedIndex];
			$value = $value.filter((_, i) => i !== draggedIndex);

			$value = [...$value.slice(0, index), draggedItem, ...$value.slice(index)];
		}
	}
</script>

<section class="preview_block" id="list">
	<div>
		{#each $value as item, index}
			<BlogBlock {item} {index} {handleDragStart} {handleDrop} {draggedIndex} />
		{/each}
	</div>
</section>

<style>
	.preview_block {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		max-width: 75%;
		height: 100%;
		margin-top: 36px;
	}
</style>
