<script>
	import {
		togglePopup,
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
			if ($generalObjectBlog.content.length > 0) {
				if (
					$generalObjectBlog.content[0].main &&
					!$generalObjectBlog.content[0].tag.startsWith('<h1')
				) {
					$generalObjectBlog.content[0] = newImageObject;
				} else {
					generalObjectBlog.update((v) => {
						v.content.splice(0, 0, newImageObject);
						return v;
					});
				}
			} else {
				$generalObjectBlog.content[0] = newImageObject;
			}
			$generalObjectBlog = { ...$generalObjectBlog, image: imgSrc, background_image: imgSrc };
			$flagMainImg = false;
		} else {
			if ($currentIndex === null) {
				$generalObjectBlog.content = [...$generalObjectBlog.content, newImageObject];
			} else {
				$generalObjectBlog.content[$currentIndex] = newImageObject;
			}
		}

		$currentIndex = null;
		$togglePopup = null;
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
		$togglePopup = null;
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
