<script>
	import { supabase } from '$lib';

	function signInWithGithub() {
		supabase.auth.signInWithOAuth({
			provider: 'github',
		}).then(({ data, error }) => {
			if (error) console.error(error);
			else console.log(data);
		});
	}

	function signUpWithGoogle() {
		supabase.auth.signInWithOAuth({
			provider: 'google',
		}).then(({ data, error }) => {
			if (error) console.error(error);
			else console.log(data);
		});
	}
</script>

<div class="flex flex-col items-center justify-center h-screen w-screen space-y-6">
	<p class="text-6xl font-bold text-white">Sign up for finch</p>
	<button
		on:click={signInWithGithub}
		class="px-6 py-3 bg-white text-white rounded-xl transition duration-200 shadow-lg"
	>
		Sign Up With GitHub
	</button>
	<button
		on:click={signUpWithGoogle}
		class="px-6 py-3 bg-white text-white rounded-xl transition duration-200 shadow-lg"
	>
		Sign Up With Google
	</button>
</div>
