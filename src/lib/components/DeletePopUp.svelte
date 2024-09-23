<script>
	import { currentIndex, toggleDeletePopup, value } from '$lib/stores/blogs/store.js';
	const deleteItem = () => {
		$value = $value.filter((el, index) => index !== $currentIndex);
		$currentIndex = null;
		$toggleDeletePopup = false;
	};
</script>

<section>
	<h2>Are you sure?</h2>
	<div>
		<button
			class="no"
			on:click={() => {
				$currentIndex = null;
				$toggleDeletePopup = false;
			}}>no</button
		><button class="yes" on:click={deleteItem}>yes</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
	}
	div {
		display: flex;
		justify-content: space-around;
	}
	.no {
		background-color: green;
	}
	.yes {
		background-color: red;
	}
</style>
