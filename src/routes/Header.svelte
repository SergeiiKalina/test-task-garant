<script>
	import { format } from 'svelte-i18n';
	import { locale, locales } from 'svelte-i18n';
</script>

<header>
	<ul>
		<li><a href="/">{$format('menu_home')}</a></li>
		<li><a href="/about">{$format('menu_about')}</a></li>
		<li><a href="/calculate">{$format('menu_calculate')}</a></li>
	</ul>
	<select bind:value={$locale}>
		{#each $locales as locale}
			<option value={locale}>{locale}</option>
		{/each}
	</select>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 10%;
	}
	select {
		width: 70px;
		height: 50px;
		font-size: 30px;
		margin-top: 10px;
	}
	ul {
		width: 50%;
		display: flex;
		justify-content: space-between;
		list-style: none;
		margin: 0 auto;
	}
	li {
		font-size: 2em;
	}
	a {
		text-decoration: none;
	}
</style>
