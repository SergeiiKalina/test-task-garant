<script>
	import {
		toggleAPopup,
		value,
		currentIndex,
		startSymbol,
		endSymbol,
		editableEl,
		indexLi
	} from '../store.js';
	import CloseButton from './CloseButton.svelte';
	let url = '';

	const parseString = (text, url) => {
		let startTag = false;
		let counter = 0;
		let result = '';

		[...text].forEach((el) => {
			if (el === '<') {
				startTag = true;
			}
			if (!startTag) {
				if (counter === $startSymbol) {
					result += `<a href="${url}">`;
				}
				if (counter === $endSymbol) {
					result += '</a>';
				}
				counter++;
			}
			result += el;
			if (el === '>') {
				startTag = false;
			}
		});
		return result;
	};

	function addURL(url) {
		const content = $value[$currentIndex].content;

		if ($indexLi) {
			const regex = new RegExp(`<li\\s+data-index="${$indexLi}">(.*?)<\/li>`, 'g');
			const modifiedContent = content.replace(regex, (match, p1) => {
				return `<li data-index="${$indexLi}">${parseString(p1, url)}</li>`;
			});
			$value[$currentIndex].content = modifiedContent;
			$indexLi = null;
		} else {
			$value[$currentIndex].content = parseString(content, url);
		}

		document.querySelectorAll('.draggable-block').forEach((el) => (el.draggable = false));
		$toggleAPopup = false;
		$editableEl = null;
	}

	const closePopup = () => {
		$toggleAPopup = false;
		$editableEl = null;
		$indexLi = null;
	};
</script>

<CloseButton {closePopup} />

<input type="text" name="a-href" bind:value={url} />

<button on:click={addURL}>ADD HREF</button>
