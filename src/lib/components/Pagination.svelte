<script>
	export let totalPages;
	export let changePage;
</script>

<div class="pagination">
	{#each Array(totalPages) as item, index}
		<button on:click={() => changePage(index + 1)}>{index + 1}</button>
	{/each}
</div>

<style>
	.pagination {
		display: flex;
		justify-content: space-around;
		width: 30%;
		margin: 24px auto 0 auto;
	}
</style>
