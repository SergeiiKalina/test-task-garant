<script>
	import {
		editableEl,
		paragraph,
		removeHtmlTags,
		currentIndex,
		subtitle,
		togglePopup,
		inputList,
		currentImgData,
		flagMainImg
	} from '$lib/stores/blogs/store.js';
	export let item;
	export let index;
	export let handleDragStart;
	export let handleDrop;
	export let draggedIndex;
	let isDraggable = true;

	const parseItemList = (html) => {
		let arrItems = [];
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		doc.body.childNodes.forEach((node, index) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				arrItems.push({ id: 'item-' + (index + 1), content: removeHtmlTags(node.innerHTML) });
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
					$togglePopup = 'paragraph';
					$paragraph = removeHtmlTags(item.content);
				} else if (item.tag.startsWith('<h2>') || item.tag.startsWith('<h3>')) {
					$togglePopup = 'subtitle';
					$subtitle = removeHtmlTags(item.content);
				} else if (item.tag.startsWith('<ol>')) {
					$togglePopup = 'list';
					$inputList = parseItemList(item.content);
				} else if (item.tag.startsWith('<ul>')) {
					$togglePopup = 'list';
					$inputList = parseItemList(item.content);
				} else if (item.tag.startsWith('<h1>')) {
					$togglePopup = 'title';
				} else if (item.content.startsWith('<img')) {
					$togglePopup = 'image';
					const srcMatch = item.content.match(/src="([^"]*)"/);
					const altMatch = item.content.match(/alt="([^"]*)"/);
					$currentImgData = {
						src: srcMatch ? srcMatch[1] : '',
						alt: altMatch ? altMatch[1] : ''
					};
				}
				if (item.main && item.tag.startsWith('<div')) {
					$flagMainImg = true;
				}
			}}>Rewrite block</button
		>
		{#if !item.main}
			<button
				class="delete"
				on:click={(e) => {
					isDraggable = true;
					$togglePopup = 'delete';
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
