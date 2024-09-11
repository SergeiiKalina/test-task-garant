<script>
	import { t } from '$lib/dictionary/index.js';
	import blogs from '$lib/blogs/articlesUa.json'

	const sendBlogs = async () => {
		for(let i = 0; i < blogs.length; i++){
			
			await fetch("http://localhost:3000/blogs", {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(blogs[i])
			})
		}
const res = await fetch("http://localhost:3000/blogs")
console.log(res)
	}
</script>

<div>{$t('home.home_content')}</div>

<button on:click={sendBlogs}>send</button>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 75vh;
	}
</style>
