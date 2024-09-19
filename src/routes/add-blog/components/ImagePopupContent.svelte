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
			if ($flagMainImg || $currentIndex === 0) {
				console.log('call');
				$generalObjectBlog = { ...$generalObjectBlog, image: imgSrc, background_image: imgSrc };
				$value[0] = {
					tag: `<div style="margin-top: 24px;">...</div>`,
					content: `<img width="100%" src="${imgSrc}" alt="pictures"/>`,
					main: true
				};
				$flagMainImg = false;
			} else {
				$generalObjectBlog = { ...$generalObjectBlog, image: imgSrc, background_image: imgSrc };
				$value[$currentIndex] = {
					tag: `<div style="margin-top: 24px;">...</div>`,
					content: `<img width="100%" src="${imgSrc}" alt="pictures"/>`,
					main: false
				};
			}
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
