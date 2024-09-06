<script>
	import src from '$lib/images/3.webp';
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
				<div><img {src} alt="any alt" /></div>
				<div class="title">{item.title}</div>
			</article>
		</a>
	{/each}
</section>
<div class="pagination">
	{#each Array(totalPages) as item, index}
		<button on:click={() => changePage(index + 1)}>{index + 1}</button>
	{/each}
</div>

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
	.pagination {
		display: flex;
		justify-content: space-around;
		width: 30%;
		margin: 24px auto 0 auto;
	}
</style>
