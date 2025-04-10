<script>
	import { getLoggedInUserId, supabase } from '$lib/index.js';

	let {open = $bindable()} = $props();

	let content = $state();

	async function submit() {
		await supabase.from('posts').insert({popularity: 0, content: content, poster: await getLoggedInUserId(), votes: []});
		content = '';
		open = false;
	}
</script>

{#if open}
	<div class="fixed inset-0 flex items-center justify-center gray-transparent bg-opacity-50">
		<div class="bg-white rounded-lg shadow-lg p-6 w-[30rem] flex flex-col space-y-4">
			<h2 class="text-xl font-semibold text-black">Create Post</h2>
			<textarea
				placeholder="Content"
				bind:value={content}
				class="border border-gray-300 rounded-md p-2 resize-none h-32 text-black"
			></textarea>
			<div class="flex justify-end space-x-2">
				<button
					onclick={submit}
					type="submit"
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Post
				</button>
				<button
					onclick={() => (open = false)}
					type="button"
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}


<style>
	.gray-transparent {
			background: rgba(0,0,0,0.5);
	}
</style>