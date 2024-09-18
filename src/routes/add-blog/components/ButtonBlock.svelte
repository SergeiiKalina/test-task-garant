<script>
	import {
		togglePPopup,
		toggleListPopup,
		toggleImgPopup,
		toggleTitlePopup,
		toggleSeoAndOtherPopup,
		flagMainImg,
		generalObjectBlog,
		toggleSubtitle
	} from '../store.js';
</script>

<section class="block-add-blocks">
	<button
		on:click={() => {
			$toggleImgPopup = true;
			$flagMainImg = true;
		}}>Add main image</button
	>
	<button
		on:click={() => {
			$toggleTitlePopup = true;
		}}>Add Title</button
	>
	<button
		on:click={() => {
			$togglePPopup = true;
		}}>Add paragraph</button
	>
	<button
		on:click={() => {
			$toggleSubtitle = true;
		}}>Add subTitle</button
	>
	<button
		on:click={() => {
			$toggleListPopup = true;
		}}>Add list</button
	>
	<button
		on:click={() => {
			$toggleImgPopup = true;
		}}>Add image</button
	>
	<button
		on:click={() => {
			$toggleSeoAndOtherPopup = true;
		}}>Add Seo and Other</button
	>
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
