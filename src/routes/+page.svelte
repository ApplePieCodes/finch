<script lang="ts">
	import {supabase} from "$lib";
	import Sidebar from "../lib/Sidebar/Sidebar.svelte";
	import Post from "../lib/Post.svelte";
	import { onMount } from 'svelte';
	import PostDialog from '$lib/PostDialog.svelte';
	import PostButton from '$lib/PostButton.svelte';

	let posts: string[] = $state([]);
	let dialog_open = $state(false);

	async function fetchPosts() {
		let { data } = await supabase.from('posts').select('id').order('posted').limit(20);

		if (data == null) {
			posts = [];
			return;
		}

		posts = data.map(post => post.id); // Simplify by mapping to the 'id' array
	}

	onMount(() => {
		fetchPosts();
	});
</script>

<div class="card">
	<Sidebar/>
</div>
<div class="md:ml-129 lg:ml-129 sm:mt-10 flex flex-col justify-center items-center min-h-screen overflow-y-auto no-scrollbar">
	{#each posts as post (post)}
		<Post post_id={post}/>
	{/each}
</div>
<PostDialog bind:open={dialog_open}/>
<PostButton bind:open={dialog_open}/>

<style>
    .no-scrollbar {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
    }

    .no-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
</style>