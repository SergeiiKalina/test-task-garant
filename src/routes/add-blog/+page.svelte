<script>
	import { uploadPhoto } from './store.js';
	import { LoremIpsum } from 'lorem-ipsum';
	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 8,
			min: 4
		},
		wordsPerSentence: {
			max: 16,
			min: 4
		}
	});

	let currentItem = null;
	let title = '';
	let paragraph = '';
	let selectionStart = 0;
	let selectionEnd = 0;
	let toggleImgPopup = false;
	let toggleAPopup = false;
	let togglePPopup = false;
	let toggleListPopup = false;
	let inputList = ['item-1'];
	let imgSrc = '';
	let aHref = '';
	$: value = [
		`<p on:touchstart={handlerTouchStart} draggable style="cursor: pointer;">${lorem.generateParagraphs(2)}</p>`
	];
	$: text = removeHtmlTags(value);
	$: visibleTitle = `<h2>${title}</h2>`;

	let draggedIndex;

	function handleDragStart(e, index) {
		draggedIndex = index;
		e.dataTransfer.effectAllowed = 'move';
	}

	function handleDrop(e, index) {
		e.preventDefault();
		if (draggedIndex !== index) {
			const draggedItem = value[draggedIndex];
			value = value.filter((_, i) => i !== draggedIndex);
			value = [...value.slice(0, index), draggedItem, ...value.slice(index)];
		}
	}

	function removeHtmlTags(html) {
		return html.join('').replace(/<[^>]*>/g, '');
	}

	const addP = () => {
		const pTextArea = document.querySelector('textarea');
		value = [...value, `<p>${pTextArea.value}</p>`];
		togglePPopup = false;
	};

	const addA = (currentItem) => {
		console.log(currentItem);
		if (selectionStart === selectionEnd) return;
		toggleAPopup = true;
	};

	const handlerSelectTextarea = (e) => {
		const textarea = e.target;
		selectionStart = textarea.selectionStart;
		selectionEnd = textarea.selectionEnd;
	};

	const addList = (e) => {
		const listArr = [];
		const form = new FormData(e.target);
		for (const [key, value] of form.entries()) {
			listArr.push(value);
		}
		value = [...value, `<ul>${listArr.map((el) => `<li>${el}</li>`).join('')}</ul>`];
		toggleListPopup = false;
	};

	function handleTextSelection(e) {
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			const selectedText = selection.toString();
			console.log('Selected text:', selectedText);
		}
	}
</script>

<div class="container">
	<section class="block-add-blocks">
		<button
			on:click={() => {
				togglePPopup = true;
			}}>Add paragraph</button
		>
		<button
			on:click={() => {
				toggleListPopup = true;
			}}>Add list</button
		>
		<button
			on:click={() => {
				toggleImgPopup = true;
			}}>Add image</button
		>
	</section>
	<section class="preview_block">
		{#if title}<div>{@html visibleTitle}</div>{/if}
		<div role="list">
			{#each value as item, index}
				<div
					class="draggable-block"
					role="listitem"
					draggable="true"
					on:dragstart={(e) => handleDragStart(e, index)}
					on:drop={(e) => handleDrop(e, index)}
					on:dragover={(e) => e.preventDefault()}
					aria-grabbed={index === draggedIndex}
				>
					<button
						on:click={(e) => {
							const block = e.target.closest('.draggable-block');
							block.draggable = false;
						}}>edit</button
					>
					<button
						on:click={(e) => {
							const block = e.target.closest('.draggable-block');
							currentItem = block;
							addA(currentItem);
							// block.draggable = true;
						}}>add link</button
					>
					{@html item}
				</div>
			{/each}
		</div>
	</section>
</div>
{#if toggleListPopup}<div class="pop-up">
		<div class="p-popup">
			<button
				class="a-popup-close"
				type="button"
				on:click={() => {
					toggleListPopup = false;
				}}>X</button
			>
			<h2>Add List</h2>
			<button
				on:click={() => {
					inputList = [...inputList, `item-${inputList.length + 1}`];
				}}>+</button
			>
			<form class="block-list" on:submit={addList}>
				{#each inputList as item}
					<label>{item}<input type="text" name={item} /></label>
				{/each}

				<button type="submit"> ADD All list</button>
			</form>
		</div>
	</div>{/if}
{#if togglePPopup}<div class="pop-up">
		<div class="p-popup">
			<button
				class="a-popup-close"
				type="button"
				on:click={() => {
					togglePPopup = false;
				}}>X</button
			>
			<h2>Add Paragraph</h2>
			<button
				on:click={() => {
					paragraph = lorem.generateParagraphs(2);
				}}
			>
				generate paragraph</button
			>
			<textarea name="paragraph" rows="20" cols="60" bind:value={paragraph}></textarea>
			<button
				on:click={() => {
					addP();
				}}
			>
				ADD</button
			>
		</div>
	</div>{/if}
{#if toggleImgPopup}<div class="pop-up">
		<div class="input-img" id="imgForm">
			<input
				type="file"
				name="img"
				on:change={async (e) => {
					imgSrc = await uploadPhoto(e.target.files[0]);
				}}
			/>
			<button
				on:click={() => {
					value = [
						...value,
						`<div style="margin-top: 24px;"><img width="100%" src="${imgSrc}" alt="pictures"/></div>`
					];
					toggleImgPopup = false;
				}}>ADD</button
			>
			<button
				class="img-popup-close"
				type="button"
				on:click={() => {
					toggleImgPopup = false;
				}}>X</button
			>
		</div>
	</div>{/if}
{#if toggleAPopup}<div class="pop-up">
		<div class="a-popup">
			<button
				class="a-popup-close"
				type="button"
				on:click={() => {
					toggleAPopup = false;
				}}>X</button
			>
			<input type="text" name="a-href" bind:value={aHref} />

			<button
				on:click={() => {
					const selectionText = value.substring(selectionStart, selectionEnd);
					const selectionTextWithTag = `<a href="${aHref}">${selectionText}</a>`;
					value =
						value.substring(0, selectionStart) +
						selectionTextWithTag +
						value.substring(selectionEnd);
					toggleAPopup = false;
				}}>ADD HREF</button
			>
		</div>
	</div>
{/if}

<style>
	div[role='listitem'] {
		position: relative;
		border: 1px solid #ccc;
		padding: 8px;
		margin: 4px 0;
		cursor: move;
	}
	.block-list {
		display: flex;
		flex-direction: column;
	}
	.block-add-blocks button {
		background-color: indigo;
		width: 150px;
		height: 30px;
		border-radius: 12px;
	}
	.p-popup {
		position: relative;
		width: 50%;
		height: 50%;
		background-color: rgb(251, 255, 0);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 20px;
	}
	.a-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
	.img-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
	.a-popup {
		position: relative;
		width: 30%;
		height: 10%;
		background-color: rgb(251, 255, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20px;
	}

	.input-img {
		position: relative;
		width: 30%;
		height: 10%;
		background-color: rgb(251, 255, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20px;
	}
	.pop-up {
		width: 100dvw;
		height: 100dvh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
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
