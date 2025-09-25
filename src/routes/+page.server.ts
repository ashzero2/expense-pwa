import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import type { Expense } from '$lib/types';

export const load: PageServerLoad = async () => {
	const { data: expenses, error: expenseError } = await supabase.from('expenses').select<'amount', Expense>();
	const { data: incomes, error: incomeError } = await supabase.from('incomes').select<'amount', Expense>();
	if (expenseError || incomeError) {
		console.error('Error loading data:', expenseError?.message || incomeError?.message);
		return { expenses: [], incomes: [] };
	}

	let totalIncome = expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
	let totalExpense = incomes?.reduce((sum, income) => sum + income.amount, 0) || 0;
	let balance = totalIncome - totalExpense;

	return {
		expenses: expenses ?? [],
		incomes: incomes ?? [],
		totalIncome,
		totalExpense,
		balance
	};
};