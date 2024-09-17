<script>
	import { editableEl } from '../store.js';
	export let item;
	export let index;
	export let handleDragStart;
	export let handleDrop;
	export let draggedIndex;
	let isDraggable = true;
</script>

<div
	id={'chunk-' + index}
	class="draggable-block"
	role="listitem"
	draggable={isDraggable}
	on:dragstart={(e) => handleDragStart(e, index)}
	on:drop={(e) => handleDrop(e, index)}
	on:dragover={(e) => e.preventDefault()}
	aria-grabbed={index === draggedIndex}
>
	<button
		on:click={(e) => {
			const button = e.target;

			isDraggable = !isDraggable;

			if (isDraggable) {
				const tooltip = document.querySelector('.tooltip-container');
				tooltip.style.opacity = 0;
				tooltip.style.visibility = 'hidden';
				button.style.backgroundColor = '';
			} else {
				button.style.backgroundColor = 'green';
			}

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
