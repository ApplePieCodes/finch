<script>
import Sidebar from '$lib/Sidebar/Sidebar.svelte';
import { getLoggedInUserId, getUserDisplayName, supabase } from '$lib';
import { onMount } from 'svelte';

let display_name = $state("")

onMount(async () => {
	display_name = await getUserDisplayName(await getLoggedInUserId());
})

async function save() {
	await supabase.from('users').update({display_name: display_name}).eq("id", await getLoggedInUserId()).select();
}
</script>

<div class="card w-64">
	<Sidebar />
</div>

<div class="fixed top-0 left-65">
	<div class="bg-gray-800 p-6 rounded-lg shadow-md text-white">
		<h2 class="text-xl font-medium mb-4">Profile</h2>
		<div class="space-y-4">
			<p>Display Name</p>
			<input type="text" bind:value={display_name} class="text-black m-1">
			<button onclick={save}>
				Save
			</button>
		</div>
	</div>
</div>