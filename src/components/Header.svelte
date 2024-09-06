<script>
	import { t, locale, locales } from '$lib/dictionary/index.js';
	const handleChange = ({ currentTarget }) => {
		const { value } = currentTarget;
		document.cookie = `lang=${value} ;`;
	};
</script>

<header>
	<ul>
		<li><a href="/">{$t('header.home')}</a></li>
		<li><a href="/about">{$t('header.about')}</a></li>
		<li><a href="/calculate">{$t('header.calculate')}</a></li>
		<li><a href="/blogs">{$t('header.blogs')}</a></li>
	</ul>
	<select bind:value={$locale} on:change={handleChange}>
		{#each $locales as value}
			<option {value} selected={$locale === value}>{$t(`lang.${value}`)}</option>
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
		width: 150px;
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
