<script lang="ts">
	let { text, href } = $props();
</script>

<li class="ml-2 my-5">
	<a href={href}>
		<button class="bg-gray-600  w-60 	dark:bg-gray-800  text-left text-2xl dark:text-white text-black">
				<p class="dark:text-white">
					{ text }
				</p>
		</button>
	</a>
</li>
