<script>
	import { currentIndex, togglePopup, generalObjectBlog } from '$lib/stores/blogs/store.js';
	const deleteItem = () => {
		$generalObjectBlog.content = $generalObjectBlog.content.filter(
			(el, index) => index !== $currentIndex
		);
		$currentIndex = null;
		$togglePopup = null;
	};
</script>

<section>
	<h2>Are you sure?</h2>
	<div>
		<button
			class="no"
			on:click={() => {
				$currentIndex = null;
				$togglePopup = null;
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
