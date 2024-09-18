<script>
	import { value, title, generalObjectBlog } from '../store.js';
	import BlogBlock from './BlogBlock.svelte';
	let draggedIndex = null;

	function handleDragStart(e, index) {
		draggedIndex = index;
		e.dataTransfer.effectAllowed = 'move';
	}
	console.log($value);
	function handleDrop(e, index) {
		e.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			const draggedItem = $value[draggedIndex];
			$value = $value.filter((_, i) => i !== draggedIndex);

			$value = [...$value.slice(0, index), draggedItem, ...$value.slice(index)];
		}
	}
	$: console.log($generalObjectBlog);
</script>

<section class="preview_block" id="list">
	{#if $generalObjectBlog.image}<div class="main-img-container">
			<img src={$generalObjectBlog.image} alt="main" width="50%" />
		</div>{/if}
	{#if $title}{@html $title}{/if}
	<div>
		{#each $value as item, index}
			<BlogBlock {item} {index} {handleDragStart} {handleDrop} {draggedIndex} />
		{/each}
	</div>
</section>

<style>
	.main-img-container {
		display: flex;
		justify-content: center;
		margin: 12px 0;
	}
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
