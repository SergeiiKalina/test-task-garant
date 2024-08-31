<script>
	import { format } from 'svelte-i18n';
</script>

<footer>
	<h1>{$format('footer')}</h1>
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0;
		height: 10%;
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 10px;
	}
</style>
