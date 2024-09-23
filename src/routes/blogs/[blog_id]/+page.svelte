<script>
	import { isRewriteBlog, generalObjectBlog } from '$lib/stores/blogs/store.js';
	import src from '$lib/images/3.webp';
	import src2 from '$lib//images/2.webp';
	import { goto } from '$app/navigation';
	import PopupBackground from '$lib/components/PopupBackground.svelte';
	import MiniWindowPopup from '$lib/components/MiniWindowPopup.svelte';
	export let data;
	let toggleDelete = false;

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

	const parseBlog = () => {
		let arr = [];
		const parser = new DOMParser();
		const doc = parser.parseFromString(blog.text, 'text/html');
		doc.body.childNodes.forEach((node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const nodeTag = node.tagName.toLowerCase();
				if (nodeTag === 'br') return;
				if (nodeTag === 'img') {
					arr.push({
						tag: `<div style="margin-top: 24px;">...</div>`,
						content: node.outerHTML
					});
				} else {
					arr.push({
						tag: `<${nodeTag}>...</${nodeTag}>`,
						content: node.innerHTML
					});
				}
			}
		});

		const initialState = [
			{
				tag: `<div style="margin-top: 24px;">...</div>`,
				content: `<img width="100%" src="${blog.image}" alt="pictures"/>`,
				main: true
			},
			{
				tag: `<h1>...</h1>`,
				content: blog.title,
				main: true
			},
			...arr
		];
		$generalObjectBlog = {
			...$generalObjectBlog,
			blog_id: blog.blog_id,
			image: blog.image,
			background_image: blog.background_image,
			slug: blog.slug,
			titleseo: blog.titleseo,
			descriptionseo: blog.descriptionseo,
			content: initialState
		};
		$isRewriteBlog = true;
		goto('/add-blog');
	};

	const restoreBlog = async () => {
		const tokenRewrite =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmV3cml0ZXIiLCJ1c2VyX2lkIjo0fQ.ExcwIS5H6mGoGQOv6zX_4eND5hBzZ0k_R7Czyl5mBmY';
		const response = await fetch('http://18.212.195.234:3000/rpc/blog_recovery', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Prefer: 'return=representation',
				Authorization: `Bearer ${tokenRewrite}`
			},
			body: JSON.stringify({ param_blog_id: blog.blog_id })
		});
		if (response.ok) {
			toggleDelete = false;
			const result = await response.json();
			alert(`${result[0].title} Blog was restored`);
			goto('/all-blogs');
		}
	};

	const deleteBlog = async () => {
		const tokenRewrite =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmV3cml0ZXIiLCJ1c2VyX2lkIjo0fQ.ExcwIS5H6mGoGQOv6zX_4eND5hBzZ0k_R7Czyl5mBmY';
		const response = await fetch('http://18.212.195.234:3000/rpc/delete_blog', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Prefer: 'return=representation',
				Authorization: `Bearer ${tokenRewrite}`
			},
			body: JSON.stringify({ param_blog_id: blog.blog_id })
		});
		if (response.ok) {
			toggleDelete = false;
			const result = await response.json();
			alert(`${result[0].title} Blog was deleted`);
			goto('/blogs');
		}
	};
</script>

<svelte:head>
	<meta property="og:title" content={blog.titleseo} />
	<meta property="og:description" content={blog.descriptionseo} />
</svelte:head>
<button on:click={parseBlog}>rewrite blog</button>
<button
	class="delete"
	on:click={() => {
		toggleDelete = true;
	}}>delete</button
>
{#if blog.isdeleted}
	<button class="restore" on:click={restoreBlog}>restore</button>
{/if}
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

{#if toggleDelete}
	<PopupBackground>
		<MiniWindowPopup
			><div class="popup-wrapper">
				<h2>Are you sure?</h2>

				<div class="button-wrpper">
					<button
						on:click={() => {
							toggleDelete = false;
						}}>no</button
					><button class="delete" on:click={deleteBlog}>yes</button>
				</div>
			</div>
		</MiniWindowPopup>
	</PopupBackground>
{/if}

<style>
	.popup-wrapper {
		display: flex;
		flex-direction: column;
	}
	.button-wrpper {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
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
	.delete {
		background-color: red;
	}
	.restore {
		background-color: green;
	}
</style>
