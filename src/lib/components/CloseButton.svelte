<script>
	export let closePopup;
</script>

<button class="button-popup-close" type="button" on:click={closePopup}>X</button>

<style>
	.button-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
</style>
