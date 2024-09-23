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

	const parseItemAndAddStrong = (html) => {
		let index = 0;
		let startTag = false;
		let result = '';
		for (let i = 0; i < html.length; i++) {
			if (html[i] === '<') startTag = true;
			if (!startTag) {
				if (index === $startSymbol) result += `<strong>`;

				if (index === $endSymbol) result += '</strong>';

				index++;
			}
			result += html[i];
			if (html[i] === '>') startTag = false;
		}

		if (index === $endSymbol) result += '</strong>';
		return result;
	};

	function addTagStrong() {
		const content = $generalObjectBlog.content[$currentIndex].content;

		if ($indexLi) {
			const regex = new RegExp(`<li\\s+data-index="${$indexLi}">(.*?)<\/li>`, 'g');
			const modifiedContent = content.replace(regex, (_, p1) => {
				const itemWithStrong = parseItemAndAddStrong(p1);
				return `<li data-index="${$indexLi}">${itemWithStrong}</li>`;
			});
			$generalObjectBlog.content[$currentIndex].content = modifiedContent;
			$indexLi = null;
		} else {
			const itemWithStrong = parseItemAndAddStrong(content);
			$generalObjectBlog.content[$currentIndex].content = itemWithStrong;
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
