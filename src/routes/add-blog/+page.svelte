<script>
	import { onMount } from 'svelte';
	import {
		togglePPopup,
		toggleListPopup,
		toggleImgPopup,
		toggleAPopup,
		value,
		currentIndex
	} from './store.js';
	import ButtonBlock from './components/ButtonBlock.svelte';
	import BlogBlock from './components/BlogBlock.svelte';
	import ListPopupContent from './components/ListPopupContent.svelte';
	import PPopupContent from './components/PPopupContent.svelte';
	import PopupBackground from './components/PopupBackground.svelte';
	import BigWindowPopup from './components/BigWindowPopup.svelte';
	import MiniWindowPopup from './components/MiniWindowPopup.svelte';
	import ImagePopupContent from './components/ImagePopupContent.svelte';
	import APopupContent from './APopupContent.svelte';

	// strong
	// numeric list
	// br

	let editableEl = null;
	let title = '';

	let textForChanges = null;

	$: visibleTitle = `<h1>${title}</h1>`;
	let draggedIndex = null;

	function handleDragStart(e, index) {
		draggedIndex = index;
		e.dataTransfer.effectAllowed = 'move';
	}

	function handleDrop(e, index) {
		e.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			const draggedItem = $value[draggedIndex];
			$value = $value.filter((_, i) => i !== draggedIndex);

			$value = [...$value.slice(0, index), draggedItem, ...$value.slice(index)];
		}
	}

	function removeHtmlTags(html) {
		return html.replace(/<[^>]*>/g, '');
	}

	onMount(() => {
		const container = document.querySelector('.container');

		container.addEventListener('mouseup', () => {
			const selection = document.getSelection();
			if (selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const selectedText = selection.toString();
				if (selectedText) {
					const selectedElement =
						range.commonAncestorContainer.nodeType === 3
							? range.commonAncestorContainer.parentElement
							: range.commonAncestorContainer;

					$currentIndex = selectedElement.closest('.draggable-block').id.split('-')[1];
					textForChanges = selectedText;

					const preRange = document.createRange();
					preRange.setStart(selectedElement, 0);
					preRange.setEnd(range.startContainer, range.startOffset);

					const startIndex = preRange.toString().length;
					const endIndex = startIndex + selectedText.length;

					startSymbol = startIndex;
					endSymbol = endIndex;
				}
			}
		});
	});
</script>

<div class="container">
	<ButtonBlock />
	<section class="preview_block" id="list">
		{#if title}{@html visibleTitle}{/if}
		<div>
			{#each $value as item, index}
				<BlogBlock
					{item}
					{index}
					{editableEl}
					{textForChanges}
					{handleDragStart}
					{handleDrop}
					{draggedIndex}
				/>
			{/each}
		</div>
	</section>
</div>
{#if $toggleListPopup}<PopupBackground>
		<BigWindowPopup>
			<ListPopupContent />
		</BigWindowPopup>
	</PopupBackground>{/if}
{#if $togglePPopup}<PopupBackground>
		<BigWindowPopup>
			<PPopupContent />
		</BigWindowPopup>
	</PopupBackground>
{/if}
{#if $toggleImgPopup}<PopupBackground>
		<MiniWindowPopup>
			<ImagePopupContent />
		</MiniWindowPopup>
	</PopupBackground>{/if}
{#if $toggleAPopup}<PopupBackground>
		<MiniWindowPopup>
			<APopupContent />
		</MiniWindowPopup>
	</PopupBackground>
{/if}

<style>
	.preview_block {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		max-width: 75%;
		height: 100%;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 36px;
	}
</style>
