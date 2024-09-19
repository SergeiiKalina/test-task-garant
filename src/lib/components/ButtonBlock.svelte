<script>
	import {
		togglePPopup,
		toggleListPopup,
		toggleImgPopup,
		toggleTitlePopup,
		toggleSeoAndOtherPopup,
		flagMainImg,
		generalObjectBlog,
		toggleSubtitle,
		isRewriteBlog,
		currentIndex
	} from '$lib/stores/blogs/store.js';
</script>

<section class="block-add-blocks">
	<button
		on:click={() => {
			$toggleImgPopup = true;
			$flagMainImg = true;
		}}>{$isRewriteBlog ? 'change main image' : 'Add main image'}</button
	>
	<button
		on:click={() => {
			$toggleTitlePopup = true;
		}}>{$isRewriteBlog ? 'change main title' : 'Add main title'}</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$togglePPopup = true;
		}}>Add paragraph</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$toggleSubtitle = true;
		}}>Add subTitle</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$toggleListPopup = true;
		}}>Add list</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$toggleImgPopup = true;
		}}>Add image</button
	>
	<button
		on:click={() => {
			$toggleSeoAndOtherPopup = true;
		}}
		>{$isRewriteBlog ? 'rewrite Seo and slug' : 'Add Seo and slug'}
	</button>
	<select
		on:change={(e) => {
			$generalObjectBlog = { ...$generalObjectBlog, tab: e.target.value };
		}}
	>
		<option value="article">article</option>
		<option value="new">new</option>
		<option value="motivation">motivation</option>
	</select>
</section>

<style>
	.block-add-blocks button {
		background-color: indigo;
		width: 150px;
		height: 30px;
		border-radius: 12px;
		color: white;
	}
</style>
