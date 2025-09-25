<script>
// @ts-nocheck

	let { data } = $props();
</script>

<ul>
	{#each data.expenses as expense}
		<li>{expense.amount}</li>
	{/each}
</ul>