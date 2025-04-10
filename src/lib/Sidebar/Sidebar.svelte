<script>
	import SidebarButton from "./SidebarButton.svelte";
	import UserButton from "./UserButton.svelte";
</script>

<div class="flex flex-col bg-black fixed left-0 top-0 h-full w-64">
	<ul>
		<li>
			<h1 class="text-2xl text-left ml-6">Finch</h1>
		</li>
		<SidebarButton text="Home" href="/"/>
		<SidebarButton text="Settings" href="/settings"/>
		<UserButton/>
	</ul>
</div>