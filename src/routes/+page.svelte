<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getCategoryIcon } from '$lib/types';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main>
	<div class="mt-2 mb-2 flex items-center justify-between border-b-4">
		<div class="ml-4">
			<h1>Expense Tracker</h1>
		</div>
		<Button onclick={toggleMode} variant="ghost" size="icon">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
	<div class="flex items-center justify-around border-b-2">
		<div class="flex flex-col items-center justify-center p-2">
			<p>Income</p>
			<p>{data.totalIncome}</p>
		</div>
		<div class="flex flex-col items-center justify-center p-2">
			<p>Expense</p>
			<p>{data.totalExpense}</p>
		</div>
		<div class="flex flex-col items-center justify-center p-2">
			<p>Total</p>
			<p>{data.totalIncome - data.totalExpense}</p>
		</div>
	</div>
	<div class="flex flex-col">
		{#each data.expenses as expense}
			{@const Component = getCategoryIcon(expense.category)}
			<div class="border-b-2 p-5 flex items-center justify-between">
				<div class="flex gap-5">
					<Component />
					<p>{expense.description}</p>
				</div>
				<p>{expense.amount}</p>
			</div>
		{/each}
	</div>
</main>
