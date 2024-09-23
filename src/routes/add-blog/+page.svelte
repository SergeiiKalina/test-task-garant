<script>
	import { onMount } from 'svelte';
	import {
		currentIndex,
		startSymbol,
		endSymbol,
		indexLi,
		generalObjectBlog,
		removeHtmlTags,
		isRewriteBlog,
		togglePopup,
		hiddenToolTip
	} from '$lib/stores/blogs/store.js';
	import ButtonBlock from '$lib/components/ButtonBlock.svelte';
	import ListPopupContent from '$lib/components/ListPopupContent.svelte';
	import ParagraphPopup from '$lib/components/ParagraphPopup.svelte';
	import PopupBackground from '$lib/components/PopupBackground.svelte';
	import BigWindowPopup from '$lib/components/BigWindowPopup.svelte';
	import MiniWindowPopup from '$lib/components/MiniWindowPopup.svelte';
	import ImagePopupContent from '$lib/components/ImagePopupContent.svelte';
	import APopupContent from '$lib/components/APopupContent.svelte';
	import ToolTips from '$lib/components/ToolTips.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import TitlePopup from '$lib/components/TitlePopup.svelte';
	import SeoAndOtherPopup from '$lib/components/SeoAndOtherPopup.svelte';
	import SubtitlePopup from '$lib/components/SubtitlePopup.svelte';
	import DeletePopUp from '$lib/components/DeletePopUp.svelte';

	let positionMouseX = null;
	let positionMouseY = null;

	onMount(() => {
		const container = document.querySelector('.container');
		function checkDeselectedText() {
			const selection = document.getSelection();
			const selectedText = selection.toString();

			if (!selectedText) {
				hiddenToolTip();
			}
		}

		function checkSelectedText() {
			const selection = document.getSelection();

			if (selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const selectedText = selection.toString();
				if (selectedText) {
					let selectedElement =
						range.commonAncestorContainer.nodeType === 3
							? range.commonAncestorContainer.parentElement
							: range.commonAncestorContainer;

					if (selectedElement.tagName === 'STRONG') {
						if (!selectedElement.closest('p')) {
							selectedElement = selectedElement.closest('li');
						} else {
							selectedElement = selectedElement.closest('p');
						}
					}

					if (selectedElement.hasAttribute('data-index')) {
						$indexLi = selectedElement.getAttribute('data-index');
					}
					$currentIndex = selectedElement.closest('.draggable-block').id.split('-')[1];

					const preRange = document.createRange();
					preRange.setStart(selectedElement, 0);
					preRange.setEnd(range.startContainer, range.startOffset);

					const startIndex = preRange.toString().length;
					const endIndex = startIndex + selectedText.length;
					$startSymbol = startIndex;
					$endSymbol = endIndex;

					if ($currentIndex !== null) {
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
			positionMouseX = e.pageX;
			positionMouseY = e.pageY;
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

	const sendBlog = async () => {
		const HTML = $generalObjectBlog.content
			.slice(2)
			.map((el) => el.tag.replace('...', el.content))
			.join('');
		const pureText = removeHtmlTags(HTML);
		console.log($generalObjectBlog);
		$generalObjectBlog = {
			...$generalObjectBlog,
			text: HTML,
			title: $generalObjectBlog.content[1].content,
			puretext: pureText
		};
		delete $generalObjectBlog.content;
		let newObj = {};
		for (let key in $generalObjectBlog) {
			newObj[`param_${key}`] = $generalObjectBlog[key];
		}

		const tokenRewrite =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmV3cml0ZXIiLCJ1c2VyX2lkIjo0fQ.ExcwIS5H6mGoGQOv6zX_4eND5hBzZ0k_R7Czyl5mBmY';
		try {
			if ($isRewriteBlog) {
				const response = await fetch('http://18.212.195.234:3000/rpc/rewrite_blog', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Prefer: 'return=representation',
						Authorization: `Bearer ${tokenRewrite}`
					},
					body: JSON.stringify(newObj)
				});

				if (response.ok) {
					const result = await response.json();
					$isRewriteBlog = false;
					alert(`${result[0].title} Blog have rewrited`);
				}
			} else {
				const response = await fetch('http://18.212.195.234:3000/rpc/create_new_blog', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Prefer: 'return=representation',
						Authorization: `Bearer ${tokenRewrite}`
					},
					body: JSON.stringify(newObj)
				});

				if (response.ok) {
					const result = await response.json();
					alert(`${result[0].title} Blog created`);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="container">
	<ButtonBlock />
	<Preview />
	<button on:click={sendBlog}>send</button>
</div>
{#if $togglePopup === 'list'}<PopupBackground>
		<BigWindowPopup>
			<ListPopupContent />
		</BigWindowPopup>
	</PopupBackground>{/if}
{#if $togglePopup === 'paragraph'}<PopupBackground>
		<BigWindowPopup>
			<ParagraphPopup />
		</BigWindowPopup>
	</PopupBackground>
{/if}
{#if $togglePopup === 'image'}<PopupBackground>
		<MiniWindowPopup>
			<ImagePopupContent />
		</MiniWindowPopup>
	</PopupBackground>{/if}
{#if $togglePopup === 'url'}<PopupBackground>
		<MiniWindowPopup>
			<APopupContent />
		</MiniWindowPopup>
	</PopupBackground>
{/if}
{#if $togglePopup === 'subtitle'}<PopupBackground>
		<BigWindowPopup>
			<SubtitlePopup />
		</BigWindowPopup>
	</PopupBackground>
{/if}
{#if $togglePopup === 'title'}<PopupBackground>
		<BigWindowPopup><TitlePopup /></BigWindowPopup>
	</PopupBackground>
{/if}
{#if $togglePopup === 'seo'}<PopupBackground>
		<BigWindowPopup><SeoAndOtherPopup /></BigWindowPopup>
	</PopupBackground>
{/if}
{#if $togglePopup === 'delete'}
	<PopupBackground>
		<MiniWindowPopup><DeletePopUp /></MiniWindowPopup>
	</PopupBackground>
{/if}

<ToolTips />

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 36px;
	}
</style>
