<script>
	import {
		value,
		titleseo,
		slug,
		descriptionseo,
		isRewriteBlog,
		generalObjectBlog
	} from '$lib/stores/blogs/store.js';
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
</script>

<svelte:head>
	<meta property="og:title" content={blog.titleseo} />
	<meta property="og:description" content={blog.descriptionseo} />
</svelte:head>
<button
	on:click={() => {
		let str = '';
		let arr = [];
		let index = 0;
		let currentStep = 0;
		let endTag = true;
		[...blog.text].map((el, i) => {
			if (el === '>' && !endTag) {
				currentStep = i;
				endTag = true;
			}
			if (el === '<' && [...blog.text][i + 1] === 'h' && endTag) {
				endTag = false;
				currentStep = i;
				arr[index] = {
					tag: '<h2>...</h2>'
				};
			}
			if (el === '<' && [...blog.text][i + 1] === 'o' && endTag) {
				endTag = false;
				currentStep = i;
				arr[index] = {
					tag: '<ol>...</ol>'
				};
			}
			if (el === '<' && [...blog.text][i + 1] === 'd' && endTag) {
				endTag = false;
				currentStep = i;
				arr[index] = {
					tag: '<div style="margin-top: 24px;">...</div>'
				};
			}
			if (el === '<' && [...blog.text][i + 1] === 'i' && endTag) {
				const imgTagRegex = /<img\s+([^>]*?)\/?>/i;
				const withoutPreviousText = blog.text.slice(i, blog.text.length);

				const imgTagMatch = withoutPreviousText.match(imgTagRegex);

				if (imgTagMatch) {
					endTag = false;

					arr[index] = {
						tag: '...',
						content: imgTagMatch[0]
					};

					currentStep = i + imgTagMatch.index + imgTagMatch[0].length;
					index++;
				}
			}
			if (el === '<' && [...blog.text][i + 1] === 'u' && endTag) {
				endTag = false;
				currentStep = i;
				arr[index] = {
					tag: '<ul>...</ul>'
				};
			}
			if (el === '<' && [...blog.text][i + 1] === 'p' && endTag) {
				endTag = false;
				currentStep = i;
				arr[index] = {
					tag: '<p>...</p>'
				};
			}

			if (el === '<' && [...blog.text][i + 1] === '/' && [...blog.text][i + 2] === 'p' && endTag) {
				arr[index] = {
					...arr[index],
					content: str
				};

				index++;
				currentStep = i + 3;
				endTag = false;
				str = '';
			}
			if (el === '<' && [...blog.text][i + 1] === '/' && [...blog.text][i + 2] === 'h' && endTag) {
				arr[index] = {
					...arr[index],
					content: str
				};

				index++;
				currentStep = i + 3;
				endTag = false;
				str = '';
			}
			if (el === '<' && [...blog.text][i + 1] === '/' && [...blog.text][i + 2] === 'o' && endTag) {
				arr[index] = {
					...arr[index],
					content: str
				};

				index++;
				currentStep = i + 4;
				endTag = false;
				str = '';
			}
			if (el === '<' && [...blog.text][i + 1] === '/' && [...blog.text][i + 2] === 'u' && endTag) {
				arr[index] = {
					...arr[index],
					content: str
				};

				index++;
				currentStep = i + 4;
				endTag = false;
				str = '';
			}
			// if (el === '<' && [...blog.text][i + 1] === '/' && [...blog.text][i + 2] === 'd' && endTag) {
			// 	arr[index] = {
			// 		...arr[index],
			// 		content: str
			// 	};
			// 	index++;
			// 	currentStep = i + 4;
			// 	endTag = false;
			// 	str = '';
			// }
			if ([...blog.text][i] === '/' && [...blog.text][i + 1] === '>' && endTag) {
				arr[index] = {
					...arr[index],
					content: str
				};

				index++;
				currentStep = i + 4;
				endTag = false;
				str = '';
			}
			if (currentStep < i && endTag) {
				str += el;
			}
		});

		$slug = blog.slug;
		$titleseo = blog.titleseo;
		$descriptionseo = blog.descriptionseo;

		$value = arr;
		$isRewriteBlog = true;
		$value = [
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
			...$value
		];
		$generalObjectBlog = {
			...$generalObjectBlog,
			blog_id: blog.blog_id,
			image: blog.image,
			background_image: blog.background_image
		};
		goto('/add-blog');
	}}>rewrite blog</button
>
<button
	class="delete"
	on:click={() => {
		toggleDelete = true;
	}}>delete</button
>
{#if blog.isdeleted}
	<button
		class="restore"
		on:click={async () => {
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
		}}>restore</button
	>
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
					><button
						class="delete"
						on:click={async () => {
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
						}}>yes</button
					>
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
