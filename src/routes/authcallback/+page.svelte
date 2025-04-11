<script>
	import { onMount } from 'svelte';
	import { getLoggedInUserId, supabase } from '$lib';
	import { generateFromEmail } from 'unique-username-generator';
	import { redirect } from '@sveltejs/kit';

	onMount(async () => {
		let user_id = await getLoggedInUserId();
		let auth = await supabase.auth.getUser();

		let {data} = await supabase.from('users').insert({id: user_id, username: generateFromEmail(auth.data?.user?.email ?? "example@email.com"), display_name: "New User", karma: 0}).select();
		redirect(308, '../')
	})
</script>