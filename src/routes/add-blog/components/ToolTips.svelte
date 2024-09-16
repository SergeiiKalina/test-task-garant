<script>
	export let addUrl;
	export let addStrong;
</script>

<div class="tooltip-container">
	<button on:click={addUrl}>Add href</button>
	<button on:click={addStrong}>Add strong</button>
</div>

<style>
	.tooltip-container {
		display: flex;
		justify-content: space-evenly;
		position: absolute;
		width: 200px;
		height: 50px;
		background-color: aqua;
		border-radius: 20px;
		opacity: 0;
		visibility: hidden;
		transition: all 500ms;
	}
</style>
