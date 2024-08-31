<script>
	import { format } from 'svelte-i18n';
</script>

<div>{$format('home_content')}</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 75vh;
	}
</style>
