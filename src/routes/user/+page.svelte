<script lang="ts">
import Sidebar from '$lib/Sidebar/Sidebar.svelte';
import { onMount } from 'svelte';
import {page} from '$app/state';
import { getUserDescription, getUserDisplayName, getUserImageUrl, getUsername } from '$lib';

let user_id = $state("");
let pfp_url = $state("");
let display_name = $state("");
let user_name = $state("");
let user_description = $state("");


onMount(async () => {
	user_id = page.url.searchParams.get('id') ?? "";
	pfp_url = await getUserImageUrl(user_id);
	display_name = await getUserDisplayName(user_id);
	user_name = await getUsername(user_id);
	user_description = await getUserDescription(user_id);
})
</script>

<div class="card w-64">
	<Sidebar />
</div>

<div class="p-8 fixed top-0 left-65 w-full h-full">
	<div class="flex items-center space-x-6 mb-8">
		<!-- Profile Section -->
		<img src={pfp_url} alt="Profile" class="rounded-full w-24 h-24" />
		<div>
			<h1 class="text-3xl font-semibold">{display_name}</h1>
			<h2 class="text-xl text-gray-700">{user_name}</h2>
		</div>
	</div>

	<!-- User Description -->
	<div class="bg-white p-6 rounded-lg shadow-md max-w-xl">
		<p class="text-lg text-gray-800">{user_description}</p>
	</div>
</div>
