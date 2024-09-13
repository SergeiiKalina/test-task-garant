<script>
	import { toggleAPopup, value, currentIndex, startSymbol, endSymbol } from './store.js';
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
				if (index === e$ndSymbol) {
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

		$value[$currentIndex].content = result;

		document.querySelectorAll('.draggable-block').forEach((el) => (el.draggable = false));
		$toggleAPopup = false;
		editableEl = null;
	}
</script>

<button
	class="button-popup-close"
	type="button"
	on:click={() => {
		$toggleAPopup = false;
	}}>X</button
>
<input type="text" name="a-href" bind:value={aHref} />

<button on:click={addHref}>ADD HREF</button>

<style>
	.button-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
</style>
