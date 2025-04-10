// place files you want to import through the `$lib` alias in this folder.

import {createClient} from '@supabase/supabase-js';

const supabaseUrl = "https://twrdbeyrriqvfqkwtokj.supabase.co"
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3cmRiZXlycmlxdmZxa3d0b2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDA2NzUsImV4cCI6MjA1OTc3NjY3NX0.Pt4LN_iSBJdCNAzBqExEpEzaaHltdfWfC8nHCmxNKdw"
export const supabase = createClient(supabaseUrl ?? "", anonKey ?? "");

export async function getLoggedInUserId(): Promise<string> {
	const {data} = await supabase.auth.getUser();

	 return data?.user?.id ?? "";
}

export async function getUserDisplayName(id: string): Promise<string> {
	let cachedUser = "Sign In"; // Default value

	if (id == "") {
		cachedUser = "Sign In";
	}
	else {
		const {data: users}  = await supabase.from('users').select('display_name').eq('id', id);
		cachedUser = users?.at(0)?.display_name ?? "Sign In";
	}

	return cachedUser;
}

export async function getUserImageUrl(id: string): Promise<string> {
	if (id == "") {
		return "no_pfp.jpg";
	}
	else {
		const {data} = await supabase.from('users')
			.select('pfp_url')
			.eq('id', id);
		const url = data?.at(0)?.pfp_url ?? "no_pfp.jpg";
		if (url == "") {
			return "no_pfp.jpg";
		}
		else {
			return url;
		}
	}
}

export async function getUsername(id: string): Promise<string> {
	let cachedUsername = "[deleted user]"; // Default value

	if (id === "") {
		return cachedUsername; // Return early if user_id is empty
	} else {
		const {data} = await supabase.from('users').select('username').eq('id', id);

		cachedUsername = "@" + (data?.at(0)?.username ?? "[deleted user]");
	}
	return cachedUsername;
}

export async function getUserDescription(id: string): Promise<string> {
	let cachedUserDescription = ""; // Default value

	if (id === "") {
		return cachedUserDescription; // Return early if user_id is empty
	} else {
		const {data} = await supabase.from('users').select('description').eq('id', id);

		cachedUserDescription = data?.at(0)?.description ?? "";
	}
	return cachedUserDescription;
}