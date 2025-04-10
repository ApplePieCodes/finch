<script>
	let {open = $bindable()} = $props();

	function openDialog() {
		open = true;
	}
</script>

<button onclick={openDialog} class="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow">
	Make a post
</button>