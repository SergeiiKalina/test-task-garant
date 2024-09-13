<script>
	import { togglePPopup, toggleListPopup, toggleImgPopup } from '../store.js';
</script>

<section class="block-add-blocks">
	<button
		on:click={() => {
			$togglePPopup = true;
		}}>Add paragraph</button
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
