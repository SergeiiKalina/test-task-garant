<script>
	import { uploadPhoto } from './store.js';
	let hex = '#000000';
	let title = '';
	let selectionStart = 0;
	let selectionEnd = 0;
	let toggleImgPopup = false;
	let toggleAPopup = false;
	let imgSrc = '';
	let aHref = '';
	$: value = `<section>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus aperiam adipisci, dolorem vitae, necessitatibus commodi similique eaque illum labore fugit sed eveniet. Illum praesentium nobis ea, ex recusandae officia eveniet!</section>`;
	$: text = removeHtmlTags(value);
	$: visibleTitle = `<h2>${title}</h2>`;

	function removeHtmlTags(html) {
		return html.replace(/<[^>]*>/g, '');
	}

	const addP = () => {
		if (selectionStart === selectionEnd) return;

		const selectionText = value.substring(selectionStart, selectionEnd);
		const selectionTextWithTag = `<p>${selectionText}</p>`;
		value =
			value.substring(0, selectionStart) + selectionTextWithTag + value.substring(selectionEnd);
	};

	const addA = () => {
		if (selectionStart === selectionEnd) return;
		toggleAPopup = true;
	};

	const handlerSelectTextarea = (e) => {
		const textarea = e.target;
		selectionStart = textarea.selectionStart;
		selectionEnd = textarea.selectionEnd;
	};

	const handlerWriteText = (e) => {
		const target = e.target;
		if (value.length === 0) {
			value = `${target.value}`;
		} else {
			value = target.value;
		}
	};

	const handlePopup = (e) => {
		if (e.target.id !== 'imgForm') togglePopup = false;
	};

	const changeTag = (e) => {
		console.log(e);
	};
</script>

<div class="container">
	<form>
		<section class="input_block">
			<label>Title<input type="text" name="title" bind:value={title} /></label>
			<label>Title for seo<input type="text" name="titleseo" /></label>
			<label>Description for seo<input type="text" name="descriptionseo" /></label>
			<label>Slug<input type="text" name="slug" /></label>
		</section>
		<h3>Content</h3>
		<section class="style_block">
			<button type="button" on:click={addP}>P</button>
			<button type="button" on:click={addA}>A</button>
			<button
				type="button"
				id="img"
				on:click={() => {
					toggleImgPopup = true;
				}}>add image</button
			><button
				on:click={() => {
					if (selectionStart === selectionEnd) return;
					const selectionText = value.substring(selectionStart, selectionEnd);
					const selectionTextWithTag = `<span style="color: red">${selectionText}</span>`;
					value =
						value.substring(0, selectionStart) +
						selectionTextWithTag +
						value.substring(selectionEnd);
				}}>red</button
			>
		</section>

		<textarea name="text" rows="30" on:select={handlerSelectTextarea} on:change={handlerWriteText}
			>{value}</textarea
		>
		<select>
			<option value="article">Article</option>
		</select>
	</form>
	<section class="preview_block">
		{#if title}<div>{@html visibleTitle}</div>{/if}
		<div>{@html value}</div>
	</section>
</div>
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
					value = value + `<div><img width="100%" src="${imgSrc}" alt="pictures"/></div>`;
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
	.style_block {
		display: flex;
		width: 70%;
		justify-content: space-evenly;
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
		max-width: 30%;
		height: 100%;
	}

	form {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 700px;
	}
	.input_block {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 300px;
	}
	textarea {
		width: 500px;
		margin: 12px auto 0 auto;
	}

	input {
		width: 200px;
		height: 24px;
	}
	label {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 75vh;
	}
	select {
		width: 120px;
		height: 30px;
		margin-top: 24px;
	}
</style>
