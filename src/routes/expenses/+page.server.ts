import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import type { Expense } from '$lib/types';

export const load: PageServerLoad = async () => {
	const { data, error } = await supabase.from('expenses').select<'amount', Expense>();
	if (error) {
		console.error('Error loading expenses:', error.message);
		return { expenses: [] };
	}

	return {
		expenses: data ?? [],
	};
};