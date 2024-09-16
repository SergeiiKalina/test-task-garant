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
		editableEl,
		indexLi,
		toggleTitlePopup,
		toggleSeoAndOtherPopup,
		generalObjectBlog
	} from './store.js';
	import ButtonBlock from './components/ButtonBlock.svelte';
	import ListPopupContent from './components/ListPopupContent.svelte';
	import PPopupContent from './components/PPopupContent.svelte';
	import PopupBackground from './components/PopupBackground.svelte';
	import BigWindowPopup from './components/BigWindowPopup.svelte';
	import MiniWindowPopup from './components/MiniWindowPopup.svelte';
	import ImagePopupContent from './components/ImagePopupContent.svelte';
	import APopupContent from './components/APopupContent.svelte';
	import ToolTips from './components/ToolTips.svelte';
	import Preview from './components/Preview.svelte';
	import TitlePopup from './components/TitlePopup.svelte';
	import SeoAndOtherPopup from './components/SeoAndOtherPopup.svelte';

	let textForChanges = null;
	let toggleToolTip = true;
	let positionMouseX = null;
	let positionMouseY = null;

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

					if (selectedElement.hasAttribute('data-index')) {
						$indexLi = selectedElement.getAttribute('data-index');
					}
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

	function addTagStrong() {
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

		if ($indexLi) {
			const regex = new RegExp(`<li\\s+data-index="${$indexLi}">(.*?)<\/li>`, 'g');

			const modifiedContent = content.replace(regex, (match, p1) => {
				const beforeText = p1.slice(0, $startSymbol);
				const afterText = p1.slice($endSymbol);
				const text = p1.slice($startSymbol, $endSymbol);
				return `<li data-index="${$indexLi}">${beforeText}<strong>${text}</strong>${afterText}</li>`;
			});
			$value[$currentIndex].content = modifiedContent;
			$indexLi = null;
		} else {
			$value[$currentIndex].content = result;
		}

		document.querySelectorAll('.draggable-block').forEach((el) => (el.draggable = false));
		$toggleAPopup = false;
		$editableEl = null;
	}

	const addUrl = () => {
		const tooltip = document.querySelector('.tooltip-container');
		$toggleAPopup = true;
		tooltip.style.opacity = 0;
		tooltip.style.visibility = 'hidden';
	};
	const addStrong = () => {
		addTagStrong();
		const tooltip = document.querySelector('.tooltip-container');
		tooltip.style.opacity = 0;
		tooltip.style.visibility = 'hidden';
	};

	const sendBlog = async () => {
		const HTML = $value.map((el) => el.tag.replace('...', el.content)).join('');
		const pureText = removeHtmlTags(HTML);
		$generalObjectBlog = { ...$generalObjectBlog, text: HTML, puretext: pureText };
		let { descriptionSEO, ...newObj } = $generalObjectBlog;

		const response = await fetch('http://localhost:3000/blogs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Prefer: 'return=representation'
			},
			body: JSON.stringify(newObj)
		});

		if (response.ok) {
			const result = await response.json();
			alert(`${result[0].title} Blog created`);
		}
	};
</script>

<div class="container">
	<ButtonBlock />
	<Preview />
	<button on:click={sendBlog}>send</button>
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
{#if $toggleTitlePopup}<PopupBackground>
		<MiniWindowPopup><TitlePopup /></MiniWindowPopup>
	</PopupBackground>
{/if}
{#if $toggleSeoAndOtherPopup}<PopupBackground>
		<BigWindowPopup><SeoAndOtherPopup /></BigWindowPopup>
	</PopupBackground>
{/if}
{#if toggleToolTip}
	<ToolTips {addUrl} {addStrong} />
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 36px;
	}
</style>
