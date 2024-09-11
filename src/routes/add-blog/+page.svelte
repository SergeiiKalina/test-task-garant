<div class="container">
	<form>
		<section class="input_block">
			<label>Title<input type="text" name="title" /></label>
			<label>Title for seo<input type="text" name="titleseo" /></label>
			<label>Description for seo<input type="text" name="descriptionseo" /></label>
			<label>Slug<input type="text" name="slug" /></label>
			<label>Pure text<input type="text" name="puretext" /></label>
		</section>
		<h3>Content</h3>
		<section class="style_block"></section>
		<textarea name="text" cols="30" rows="20"></textarea>
		<select>
			<option value="article">Article</option>
		</select>
	</form>
	<section class="preview_block">
		<div>preview</div>
	</section>
</div>

<style>
	.preview_block {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30%;
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
		margin: 0 auto;
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
