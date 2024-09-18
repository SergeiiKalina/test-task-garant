<script>
	import { value, titleseo, slug, descriptionseo, isRewriteBlog } from '../../add-blog/store.js';
	import src from '$lib/images/3.webp';
	import src2 from '$lib//images/2.webp';
	import { goto } from '$app/navigation';
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
			if (el === '<' && [...blog.text][i + 1] === '/' && [...blog.text][i + 2] === 'd' && endTag) {
				arr[index] = {
					...arr[index],
					content: str
				};
				index++;
				currentStep = i + 4;
				endTag = false;
				str = '';
			}
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
		goto('/add-blog');
	}}>rewrite blog</button
>
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
