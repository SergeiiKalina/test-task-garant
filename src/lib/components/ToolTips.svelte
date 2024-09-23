<script>
	import {
		generalObjectBlog,
		currentIndex,
		startSymbol,
		endSymbol,
		indexLi,
		togglePopup,
		editableEl,
		hiddenToolTip
	} from '../stores/blogs/store.js';

	const addUrl = () => {
		$togglePopup = 'url';
		hiddenToolTip();
	};
	const addStrong = () => {
		addTagStrong();
		hiddenToolTip();
	};

	function addTagStrong() {
		const content = $generalObjectBlog.content[$currentIndex].content;
		let index = 0;
		let startTag = false;
		let result = '';

		for (let i = 0; i < content.length; i++) {
			if (content[i] === '<') startTag = true;
			if (!startTag) {
				if (index === $startSymbol) result += `<strong>`;
				if (index === $endSymbol) result += '</strong>';
				index++;
			}
			result += content[i];
			if (content[i] === '>') startTag = false;
		}

		if (index === $endSymbol) result += '</a>';

		if ($indexLi) {
			const regex = new RegExp(`<li\\s+data-index="${$indexLi}">(.*?)<\/li>`, 'g');

			const modifiedContent = content.replace(regex, (match, p1) => {
				const beforeText = p1.slice(0, $startSymbol);
				const afterText = p1.slice($endSymbol);
				const text = p1.slice($startSymbol, $endSymbol);
				return `<li data-index="${$indexLi}">${beforeText}<strong>${text}</strong>${afterText}</li>`;
			});
			$generalObjectBlog.content[$currentIndex].content = modifiedContent;
			$indexLi = null;
		} else {
			$generalObjectBlog.content[$currentIndex].content = result;
		}

		document.querySelectorAll('.draggable-block').forEach((el) => (el.draggable = false));
		$togglePopup = null;
		$editableEl = null;
		$currentIndex = null;
	}
</script>

<div class="tooltip-container">
	<button on:click={addUrl}>Add href</button>
	<button on:click={addStrong}>Add strong</button>
</div>

<style>
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
</style>
