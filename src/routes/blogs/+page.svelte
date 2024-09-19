<script>
	import src from '$lib/images/3.webp';
	import Pagination from '$lib/components/Pagination.svelte';
	export let data;
	let currentPage = 1;
	$: quantityBlogs = 9;
	$: startItem = (currentPage - 1) * quantityBlogs;
	$: blogs = data.blogs.slice(startItem, quantityBlogs + startItem);
	$: totalPages = Math.ceil(data.blogs.length / quantityBlogs);
	function changePage(page) {
		currentPage = page;
	}
</script>

<section>
	{#each blogs as item, index}
		<a href={`/blogs/${item.blog_id}`}>
			<article>
				<div><img src={item.image.startsWith('https://') ? item.image : src} alt="any alt" /></div>
				<div class="title">{item.title}</div>
			</article>
		</a>
	{/each}
</section>
<Pagination {totalPages} {changePage} />

<style>
	section {
		width: 80%;
		display: flex;
		flex-wrap: wrap;
		margin: 36px auto 24px auto;
	}
	div {
		display: flex;
		justify-content: center;
	}
	a {
		display: flex;
		flex-direction: column;
		height: 300px;
		width: 32.5%;
		cursor: pointer;
		text-decoration: none;
	}
	img {
		width: 300px;
	}
	.title {
		width: 45%;
		margin: 4px auto 0 auto;
	}
</style>
