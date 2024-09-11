<script> 
import {uploadPhoto} from './store.js'
let hex = "#000000"
let title = ''
let selectionStart = 0
let selectionEnd = 0
let togglePopup = false
$: value = `<section>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus aperiam adipisci, dolorem vitae, necessitatibus commodi similique eaque illum labore fugit sed eveniet. Illum praesentium nobis ea, ex recusandae officia eveniet!</section>`
$: text = removeHtmlTags(value)
$: visibleTitle = `<h2>${title}</h2>`

function removeHtmlTags(html) {
        return html.replace(/<[^>]*>/g, ''); 
	    }

const addP = () => {

if(selectionStart === selectionEnd) return 
	
 const selectionText = value.substring(selectionStart, selectionEnd)
 const selectionTextWithTag = `<p>${selectionText}</p>`
 value = value.substring(0, selectionStart)  + selectionTextWithTag + value.substring(selectionEnd)
	
}



const handlerSelectTextarea = (e) => {
	const textarea = e.target
	selectionStart = textarea.selectionStart
	selectionEnd = textarea.selectionEnd

}

const handlerWriteText = (e) => {
	const target = e.target
	if(value.length === 0){
		value = `${target.value}`
	}else{
		value = target.value
	}
	
}

const handlePopup = (e) => {
	
	if(e.target.id !== 'imgForm') togglePopup = false
}

const changeTag = (e) => {
console.log(e)
}

</script> 

<div class="container" >
	<form>
		<section class="input_block">
			<label>Title<input type="text" name="title" bind:value={title}/></label>
			<label>Title for seo<input type="text" name="titleseo" /></label>
			<label>Description for seo<input type="text" name="descriptionseo" /></label>
			<label>Slug<input type="text" name="slug" /></label>
		</section>
		<h3>Content</h3>
		<section class="style_block"><button type="button" on:click={addP}>p</button> <button type="button" id='img' on:click={()=> {
			togglePopup = true
		}}>add image</button><button on:click={() => {
			if(selectionStart === selectionEnd) return 
			const selectionText = value.substring(selectionStart, selectionEnd)
 const selectionTextWithTag = `<span style="color: red">${selectionText}</span>`
 value = value.substring(0, selectionStart)  + selectionTextWithTag + value.substring(selectionEnd)

		}}>red</button></section>
	
		<textarea name="text" cols="30" rows="20" on:select={handlerSelectTextarea} on:change={handlerWriteText} >{value}</textarea>
		<select>
			<option value="article">Article</option>
		</select>
	</form>
	<section class="preview_block">
		{#if title}<div>{@html visibleTitle}</div>{/if}
		<div>{@html value}</div>
	</section>
</div>
{#if togglePopup}<div class="pop-up" > <div class="input-img" id="imgForm">
	<input type="file" name='img' on:change={(e) => {
		uploadPhoto(e.target.files[0])
	}}/>

	<button type="button" on:click={() => {
		togglePopup = false
	}}>close</button>
</div></div>{/if}
<style>


	.input-img {
width: 40%;
height: 50%;
background-color: aliceblue;

	}
	.pop-up{
		width: 100dvw;
		height: 100dvh;
		position: absolute;
		top: 0; left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.preview_block {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		max-width: 30%;
		height: 100%;
	}

	form {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 700px;
	}
	.input_block {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 300px;
	}
	textarea {
		width: 400px;
		margin: 12px auto 0 auto;
	}

	input {
		width: 200px;
		height: 24px;
	}
	label {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 75vh;
	}
	select {
		width: 120px;
		height: 30px;
		margin-top: 24px;
	}
</style>
