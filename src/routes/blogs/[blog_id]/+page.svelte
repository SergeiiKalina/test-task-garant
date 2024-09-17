<script>
	import src from '$lib/images/3.webp';
	import src2 from '$lib//images/2.webp';
	export let data;

	const blog = data.blog[0];
	const date = new Date(blog.createat).toLocaleDateString('eu-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	let updatedText = blog.text.replace(/<img\s+[^>]*src="([^"]*)"/g, (match, p1) => {
		if (p1.startsWith('https://')) {
			return match;
		} else {
			return match.replace(p1, src2);
		}
	});
</script>

<svelte:head>
	<meta property="og:title" content={blog.titleseo} />
	<meta property="og:description" content={blog.descriptionseo} />
</svelte:head>

<img
	src={blog.background_image.startsWith('https://') ? blog.background_image : src}
	alt="any pictures"
/>
<section>
	<header>
		<h2>{blog.title}</h2>
		<time>{date}</time>
	</header>
	<article>{blog.descriptionseo}</article>
	<article>{@html updatedText}</article>
</section>

<style>
	section {
		min-height: 100vh;
		margin-top: 24px;
		width: 60%;
		overflow: auto;
		margin: 0 auto;
	}
	header {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	time {
		font-size: 24px;
		margin-left: 2em;
	}
	img {
		width: 100%;
		height: 500px;
		display: block;
		margin: 0 auto;
		padding-top: 40px;
	}
</style>
