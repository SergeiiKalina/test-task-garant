<script>
	import {
		toggleImgPopup,
		value,
		uploadPhoto,
		flagMainImg,
		generalObjectBlog,
		currentIndex
	} from '$lib/stores/blogs/store.js';
	let imgSrc = '';

	function createImageObject(src, flag) {
		return {
			tag: `<div style="margin-top: 24px;">...</div>`,
			content: `<img width="100%" src="${src}" alt="pictures"/>`,
			main: flag
		};
	}

	function addImageObject(imgSrc) {
		const newImageObject = createImageObject(imgSrc, $flagMainImg);
		if ($flagMainImg) {
			if ($value.length > 0) {
				if ($value[0].main) {
					$value[0] = newImageObject;
				} else {
					value.update((v) => {
						v.splice(0, 0, newImageObject);
						return v;
					});
				}
			} else {
				$value[0] = newImageObject;
			}
			$generalObjectBlog = { ...$generalObjectBlog, image: imgSrc, background_image: imgSrc };
			$flagMainImg = false;
		} else {
			if ($currentIndex === null) {
				$value = [...$value, newImageObject];
			} else {
				$value[$currentIndex] = newImageObject;
			}
		}

		$currentIndex = null;
		$toggleImgPopup = false;
	}
</script>

<input
	type="file"
	name="img"
	on:change={async (e) => {
		imgSrc = await uploadPhoto(e.target.files[0]);
	}}
/>
<button on:click={() => addImageObject(imgSrc)}>ADD</button>
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
