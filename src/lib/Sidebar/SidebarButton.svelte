<script lang="ts">
	let { text, href } = $props();
</script>

<li class="ml-2 my-5 mt-auto">
	<a href={href}>
		<button class="w-60">
			<p class="text-left text-2xl text-white">
				{ text }
			</p>
		</button>
	</a>
</li>
