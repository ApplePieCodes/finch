<script lang="ts">
	import { getLoggedInUserId, getUserDisplayName, getUserImageUrl } from '$lib';
	import { onMount } from 'svelte';
	let user_id = $state("");
	let user_image_url = $state("no_pfp.jpg");
	let user_name = $state("Sign In");
	let link = $state("/login");

	function getLink(): string {
		if (user_id == "") {
			return "/login";
		}
		else {
			return "/user?id=" + user_id;
		}
	}

	onMount(async () => {
		user_id = await getLoggedInUserId();
		user_image_url = await getUserImageUrl(user_id);
		user_name = await getUserDisplayName(user_id);
		link = getLink();
	})
</script>

<li class="ml-2 my-5">
	<a href={link}>
		<button class="w-60">
			<div class="flex">
				<img width="40" alt="Avatar" class="inline rounded-full" src={user_image_url}/>
				<p class="ml-3 inline text-left text-2xl text-white">
					{ user_name }
				</p>
			</div>
		</button>
	</a>
</li>