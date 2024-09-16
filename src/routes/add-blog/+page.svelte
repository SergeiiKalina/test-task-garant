<script>
	import { onMount } from 'svelte';
	import {
		togglePPopup,
		toggleListPopup,
		toggleImgPopup,
		toggleAPopup,
		value,
		currentIndex,
		startSymbol,
		endSymbol,
		editableEl
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

	let title = '';
	let textForChanges = null;
	let toggleToolTip = true;
	let positionMouseX = null;
	let positionMouseY = null;
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

		function checkDeselectedText() {
			const selection = document.getSelection();
			const selectedText = selection.toString();

			if (!selectedText) {
				const tooltip = document.querySelector('.tooltip-container');
				tooltip.style.opacity = 0;
				tooltip.style.visibility = 'hidden';
			}
		}

		function checkSelectedText() {
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
					$startSymbol = startIndex;
					$endSymbol = endIndex;

					if (textForChanges && $currentIndex !== null) {
						const tooltip = document.querySelector('.tooltip-container');
						tooltip.style.top = positionMouseY - 60 + 'px';
						tooltip.style.left = positionMouseX + 'px';
						tooltip.style.opacity = 1;
						tooltip.style.visibility = 'visible';
					}
				}
			}
		}

		function checkMousePosition(e) {
			positionMouseX = e.clientX;
			positionMouseY = e.clientY;
		}

		document.addEventListener('selectionchange', checkDeselectedText);
		container.addEventListener('mouseup', checkSelectedText);
		document.addEventListener('mousemove', checkMousePosition);

		return () => {
			document.removeEventListener('selectionchange', checkDeselectedText);
			container.removeEventListener('mouseup', checkSelectedText);
			document.removeEventListener('mousemove', checkMousePosition);
		};
	});

	function addStrong() {
		const content = $value[$currentIndex].content;
		let index = 0;
		let startTag = false;
		let result = '';

		for (let i = 0; i < content.length; i++) {
			if (content[i] === '<') {
				startTag = true;
			}
			if (!startTag) {
				if (index === $startSymbol) {
					result += `<strong>`;
				}
				if (index === $endSymbol) {
					result += '</strong>';
				}
				index++;
			}
			result += content[i];
			if (content[i] === '>') {
				startTag = false;
			}
		}

		if (index === $endSymbol) {
			result += '</a>';
		}

		$value[$currentIndex] = {
			...$value[$currentIndex],
			content: result
		};

		document.querySelectorAll('.draggable-block').forEach((el) => (el.draggable = false));
		$toggleAPopup = false;
		$editableEl = null;
	}
</script>

<div class="container">
	<ButtonBlock />
	<section class="preview_block" id="list">
		{#if title}{@html visibleTitle}{/if}
		<div>
			{#each $value as item, index}
				<BlogBlock {item} {index} {handleDragStart} {handleDrop} {draggedIndex} />
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
{#if toggleToolTip}
	<div class="tooltip-container">
		<button
			on:click={() => {
				const tooltip = document.querySelector('.tooltip-container');
				$toggleAPopup = true;
				tooltip.style.opacity = 0;
				tooltip.style.visibility = 'hidden';
			}}>Add href</button
		>
		<button
			on:click={() => {
				addStrong();
				const tooltip = document.querySelector('.tooltip-container');
				tooltip.style.opacity = 0;
				tooltip.style.visibility = 'hidden';
			}}>Add strong</button
		>
	</div>
{/if}

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
	.tooltip-container {
		display: flex;
		justify-content: space-evenly;
		position: absolute;
		width: 200px;
		height: 50px;
		background-color: aqua;
		border-radius: 20px;
		opacity: 0;
		visibility: hidden;
		transition: all 500ms;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 36px;
	}
</style>
