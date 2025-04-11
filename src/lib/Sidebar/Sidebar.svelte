<script>
	import SidebarButton from "./SidebarButton.svelte";
	import UserButton from "./UserButton.svelte";
	import { base } from '$app/paths';
	let open = false;
</script>

<div class="md:flex flex-col dark:bg-black bg-gray-300 fixed left-0 top-0 h-full w-64">
	<ul>
		<li>
			<h1 class="text-2xl text-left ml-6 dark:text-white text-black">Finch</h1>
		</li>
		<SidebarButton text="Home" href="{base}/" />
		<SidebarButton text="Settings" href="{base}/settings" />
		<UserButton />
	</ul>
</div>