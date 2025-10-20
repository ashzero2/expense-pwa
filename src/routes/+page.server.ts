import type { Expense } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const resp = await fetch('http://localhost:3000/dashboard/overview');
	const expenseList = await fetch('http://localhost:3000/transaction/list');
	
	const data = await resp.json();
	const expenses: Expense[] = await expenseList.json();

	console.log(data.totalExpense);
	return {
		totalIncome: data.totalIncome || 0,
		totalExpense: data.totalExpense || 0,
		balance: data.balance || 0,
		expenses: expenses || []
	};
};	