<script>
	import {
		toggleImgPopup,
		value,
		uploadPhoto,
		flagMainImg,
		generalObjectBlog,
		currentIndex
	} from '../store.js';
	let imgSrc = '';
</script>

<input
	type="file"
	name="img"
	on:change={async (e) => {
		imgSrc = await uploadPhoto(e.target.files[0]);
	}}
/>
<button
	on:click={() => {
		if ($currentIndex === null) {
			$generalObjectBlog = { ...$generalObjectBlog, image: imgSrc, background_image: imgSrc };
			$value = [
				...$value,
				{
					tag: `<div style="margin-top: 24px;">...</div>`,
					content: `<img width="100%" src="${imgSrc}" alt="pictures"/>`
				}
			];
		} else {
			$generalObjectBlog = { ...$generalObjectBlog, image: imgSrc, background_image: imgSrc };
			$value[$currentIndex] = {
				tag: `<div style="margin-top: 24px;">...</div>`,
				content: `<img width="100%" src="${imgSrc}" alt="pictures"/>`,
				main: $currentIndex !== 0 ? false : true
			};
		}

		$currentIndex = null;
		$toggleImgPopup = false;
	}}>ADD</button
>
<button
	class="img-popup-close"
	type="button"
	on:click={() => {
		$toggleImgPopup = false;
	}}>X</button
>

<style>
	.img-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
</style>
