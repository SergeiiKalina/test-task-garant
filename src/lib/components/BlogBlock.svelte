<script>
	import {
		editableEl,
		paragraph,
		removeHtmlTags,
		togglePPopup,
		currentIndex,
		toggleSubtitle,
		subtitle,
		toggleListPopup,
		toggleDeletePopup,
		inputList,
		toggleTitlePopup,
		title,
		toggleImgPopup,
		currentImgData
	} from '$lib/stores/blogs/store.js';
	export let item;
	export let index;
	export let handleDragStart;
	export let handleDrop;
	export let draggedIndex;
	let isDraggable = true;

	const parseItemList = (html) => {
		let arrItems = [];
		let flag = false;
		let str = '';
		let count = 1;
		[...html].forEach((el, index) => {
			if (el === '<' && [...html][index + 1] === 'l' && !flag) {
				flag = true;
			}
			if (el === '<' && [...html][index + 1] === '/' && ([...html][index + 2] === 'l') & !flag) {
				flag = true;
				arrItems.push({ id: 'item-' + count, content: removeHtmlTags(str) });
				count++;
				str = '';
			}
			if (!flag) {
				str += el;
			}
			if (el === '>' && flag) {
				flag = false;
			}
		});
		return arrItems;
	};
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
		on:click={() => {
			isDraggable = !isDraggable;
			if (isDraggable) {
				const tooltip = document.querySelector('.tooltip-container');
				tooltip.style.opacity = 0;
				tooltip.style.visibility = 'hidden';
			}
			$editableEl = index;
		}}
		class={!isDraggable ? 'active' : ''}>edit</button
	>
	{#if item.main}
		<em class="main-block">Is Main</em>
	{/if}

	{#if !isDraggable}
		<button
			on:click={() => {
				$currentIndex = index;
				if (item.tag.startsWith('<p')) {
					$togglePPopup = true;
					$paragraph = removeHtmlTags(item.content);
				} else if (item.tag.startsWith('<h2>')) {
					$toggleSubtitle = true;
					$subtitle = removeHtmlTags(item.content);
				} else if (item.tag.startsWith('<ol>')) {
					$toggleListPopup = true;
					$inputList = parseItemList(item.content);
				} else if (item.tag.startsWith('<ul>')) {
					$toggleListPopup = true;
					$inputList = parseItemList(item.content);
				} else if (item.tag.startsWith('<h1>')) {
					$toggleTitlePopup = true;
					$title = removeHtmlTags(item.content);
				} else if (item.content.startsWith('<img')) {
					$toggleImgPopup = true;
					const srcMatch = item.content.match(/src="([^"]*)"/);
					const altMatch = item.content.match(/alt="([^"]*)"/);
					$currentImgData = {
						src: srcMatch ? srcMatch[1] : '',
						alt: altMatch ? altMatch[1] : ''
					};
				}
			}}>Rewrite block</button
		>
		{#if !item.main}
			<button
				class="delete"
				on:click={(e) => {
					isDraggable = true;
					$toggleDeletePopup = true;
					$currentIndex = index;
				}}>X</button
			>
		{/if}
	{/if}
	{@html item.tag.replace('...', item.content)}
</div>

<style>
	.main-block {
		position: absolute;
		top: 5px;
		right: 10px;
		color: green;
	}
	div[role='listitem'] {
		position: relative;
		border: 1px solid #ccc;
		padding: 8px;
		margin: 4px 0;
		cursor: move;
		width: 100%;
	}
	.active {
		background-color: green;
	}
	.delete {
		position: absolute;
		top: 5px;
		right: 10px;
		color: red;
	}
</style>
