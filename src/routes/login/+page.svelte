<script>
	import { supabase } from '$lib';
	import {base} from "$app/paths"

	function signInWithGithub() {
		supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `https://applepiecodes.github.io/finch/authcallback`,
			},
		}).then(({ data, error }) => {
			if (error) console.error(error);
			else console.log(data);
		});
	}

	function signInWithGoogle() {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `https://applepiecodes.github.io/finch/authcallback`,
			},
		}).then(({ data, error }) => {
			if (error) console.error(error);
			else console.log(data);
		});
	}
</script>

<div class="flex flex-col items-center justify-center h-screen w-screen space-y-6">
	<p class="text-6xl font-bold text-white">Login To finch</p>
	<button
		on:click={signInWithGithub}
		class="px-6 py-3 bg-white text-white rounded-xl transition duration-200 shadow-lg"
	>
		Sign In With GitHub
	</button>
	<button
		on:click={signInWithGoogle}
		class="px-6 py-3 bg-white text-white rounded-xl transition duration-200 shadow-lg"
	>
		Sign In With Google
	</button>
	<p>Don't have an account?</p>
	<a href="{base}/signup">
		<button
			class="px-6 py-3 bg-white text-white rounded-xl transition duration-200 shadow-lg"
		>
			Sign Up
		</button>
	</a>
</div>
