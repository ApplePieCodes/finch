<script lang="ts">
	import { getLoggedInUserId, getUserDisplayName, getUserImageUrl, getUsername, supabase } from '$lib/index';
	import { onMount } from 'svelte';

	let {post_id} = $props();
	let user_id = $state("");
	let user_img = $state("");
	let user_display_name = $state("");
	let username = $state("");
	let content = $state("");
	let user_vote = $state("none");
	let page_votes = $state(0);

	async function getUserId(): Promise<string> {
		let cachedUserId = "";

		let {data} = await supabase.from('posts').select('poster').eq('id', post_id);

		cachedUserId = data?.at(0)?.poster ?? "";

		return cachedUserId; // temporary fallback
	}

	async function getContent(): Promise<string> {
		let cachedContent = ""; // Default value

		if (post_id === "") {
			return cachedContent; // Return early if user_id is empty
		} else {
			let {data} = await supabase.from('posts').select('content').eq('id', post_id);

			cachedContent = data?.at(0)?.content ?? "";
		}
		return cachedContent;
	}

	async function getUserVote(): Promise<string> {
		let {data} = await supabase.from('votes').select('vote').eq('post', post_id).eq('user_id', await getLoggedInUserId());

		if (data?.length == 0) {
			return "none";
		}
		else {
			return data?.at(0)?.vote ?? "none";
		}
	}

	async function getVotes(): Promise<number> {
		let {data} = await supabase.from('votes').select('vote').eq('post', post_id);

		let votes = 0;

		if (data == null) {
			return 0;
		}

		for (var datum of data) {
			if (datum.vote == "upvote") {
				votes += 1;
			}
			else if (datum.vote == "downvote") {
				votes -= 1;
			}
		}

		return votes;
	}

	async function upvote(): Promise<void> {
		let user = await getLoggedInUserId();
		if (user_vote == "none") {
			let {data, error} = await supabase.from("votes").insert({ vote: "upvote", post: post_id, user_id: user });
			user_vote = "upvote";
		}
		else if (user_vote == "downvote") {
			let {data} = await supabase.from("votes").update({ vote: "upvote" }).eq("post", post_id).eq("user_id", user).select();
			user_vote = "upvote";
		}
		else if (user_vote == "upvote") {
			let {data} = await supabase.from("votes").delete().eq("user_id", user).eq("post", post_id);
			user_vote = "none";
		}
		page_votes = await getVotes();
	}

	async function downvote(): Promise<void> {
		let user = await getLoggedInUserId();
		if (user_vote == "none") {
			let {data, error} = await supabase.from("votes").insert({ vote: "downvote", post: post_id, user_id: user });
			user_vote = "downvote";
		}
		else if (user_vote == "upvote") {
			let {data} = await supabase.from("votes").update({ vote: "downvote" }).eq("post", post_id).eq("user_id", user).select();
			user_vote = "downvote";
		}
		else if (user_vote == "downvote") {
			let {data} = await supabase.from("votes").delete().eq("user_id", user).eq("post", post_id);
			user_vote = "none";
		}
		page_votes = await getVotes();
	}

	onMount(async () => {
		user_id = await getUserId();
		user_img = await getUserImageUrl(user_id);
		user_display_name = await getUserDisplayName(user_id);
		username = await getUsername(user_id);
		content = await getContent();
		user_vote = await getUserVote();
		page_votes = await getVotes();
	})
</script>

<div class="card bg-black rounded-2xl my-5 w-120 max-w-sm p-6 border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
	<div class="card-header border-0 d-flex align-items-center">
		<a href="/user?id={user_id}">
			<img width="60" alt="Avatar" class="mb-7 inline rounded-full" src={user_img}>
		</a>
		<a href="/user?id={user_id}">
			<div style="margin-left: 10px;" class="mt-5 text-white inline-block">
				<h3>{user_display_name}</h3>
				<h4>{username}</h4>
			</div>
		</a>
	</div>

	<div class="card-body rounded-2xl">
		<p>{content}</p>
	</div>

	<div class="card-footer border-0 d-flex align-items-center">
		<button onclick={upvote}>Upvote</button>
		<p>{page_votes}</p>
		<button onclick={downvote}>Downvote</button>
	</div>
</div>