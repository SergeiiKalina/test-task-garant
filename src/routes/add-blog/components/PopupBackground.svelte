<div class="pop-up">
	<slot />
</div>

<style>
	.pop-up {
		width: 100dvw;
		height: 100dvh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
