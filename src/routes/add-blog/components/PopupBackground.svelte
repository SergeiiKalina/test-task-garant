<div class="pop-up">
	<slot />
</div>

<style>
	.pop-up {
		width: 100dvw;
		height: 100dvh;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
