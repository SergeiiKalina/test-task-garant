<script>
	import {
		togglePopup,
		flagMainImg,
		generalObjectBlog,
		isRewriteBlog,
		currentIndex
	} from '$lib/stores/blogs/store.js';
</script>

<section class="block-add-blocks">
	<button
		on:click={() => {
			$togglePopup = 'image';
			$flagMainImg = true;
		}}>{$isRewriteBlog ? 'change main image' : 'Add main image'}</button
	>
	<button
		on:click={() => {
			$togglePopup = 'title';
		}}>{$isRewriteBlog ? 'change main title' : 'Add main title'}</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$togglePopup = 'paragraph';
		}}>Add paragraph</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$togglePopup = 'subtitle';
		}}>Add subTitle</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$togglePopup = 'list';
		}}>Add list</button
	>
	<button
		on:click={() => {
			$currentIndex = null;
			$togglePopup = 'image';
		}}>Add image</button
	>
	<button
		on:click={() => {
			$togglePopup = 'seo';
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
