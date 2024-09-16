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
	let aHref = '';

	function addHref(aHref) {
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
					result += `<a href="${aHref}">`;
				}
				if (index === $endSymbol) {
					result += '</a>';
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
				return `<li data-index="${$indexLi}">${beforeText}<a href="${aHref}">${text}</a>${afterText}</li>`;
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

	const closePopup = () => {
		$toggleAPopup = false;
		$editableEl = null;
		$indexLi = null;
	};
</script>

<CloseButton {closePopup} />

<input type="text" name="a-href" bind:value={aHref} />

<button on:click={addHref}>ADD HREF</button>
