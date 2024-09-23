<script>
	import {
		togglePopup,
		uploadPhoto,
		flagMainImg,
		generalObjectBlog,
		currentIndex,
		currentImgData
	} from '$lib/stores/blogs/store.js';

	let imgSrc = '';
	let alt = '';

	function createImageObject(src, alt, flag) {
		return {
			tag: `<div style="margin-top: 24px;">...</div>`,
			content: `<img width="100%" src="${src}" alt="${alt}"/>`,
			main: flag,
			alt,
			src
		};
	}

	function addImageObject(imgSrc, alt) {
		const newImageObject = createImageObject(imgSrc, alt, $flagMainImg);
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

<section>
	<input
		type="file"
		name="img"
		on:change={async (e) => {
			imgSrc = await uploadPhoto(e.target.files[0]);
		}}
	/>
	<label
		><div>Alt</div>
		<input type="text" bind:value={$currentImgData.alt} /></label
	>
	<button class="add" on:click={() => addImageObject(imgSrc, $currentImgData.alt)}>ADD</button>
</section>

<button
	class="img-popup-close"
	type="button"
	on:click={() => {
		$togglePopup = null;
	}}>X</button
>

<style>
	.add {
		width: 50%;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-evenly;
	}
	label {
		display: flex;
		justify-content: space-between;
		width: 85%;
	}
	.img-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
</style>
