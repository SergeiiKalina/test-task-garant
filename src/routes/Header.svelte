<script>
	import { t, locale, locales } from '../i18n.js';
</script>

<ul>
	<li><a href="/">{$t('menu.home')}</a></li>
	<li><a href="/about">{$t('menu.about')}</a></li>
	<li><a href="/calculate">{$t('menu.calculate')}</a></li>

	<div>
		<select bind:value={$locale}>
			{#each locales as l}
				<option value={l}>{l}</option>
			{/each}
		</select>
	</div>
</ul>

<style>
	select {
		width: 70px;
		height: 50px;
		font-size: 30px;
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
