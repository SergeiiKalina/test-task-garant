<script>
	import { editableEl } from '../store.js';
	export let item;
	export let index;
	export let handleDragStart;
	export let handleDrop;
	export let draggedIndex;
</script>

<div
	id={'chunk-' + index}
	class="draggable-block"
	role="listitem"
	draggable="true"
	on:dragstart={(e) => handleDragStart(e, index)}
	on:drop={(e) => handleDrop(e, index)}
	on:dragover={(e) => e.preventDefault()}
	aria-grabbed={index === draggedIndex}
>
	<button
		on:click={(e) => {
			const block = e.target.closest('.draggable-block');
			block.draggable = false;
			$editableEl = index;
		}}>edit</button
	>
	{@html item.tag.replace('...', item.content)}
</div>

<style>
	div[role='listitem'] {
		position: relative;
		border: 1px solid #ccc;
		padding: 8px;
		margin: 4px 0;
		cursor: move;
	}
</style>
