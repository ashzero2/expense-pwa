<script lang="ts">
	// --- Imports Start ---
	import { CategoryTypes } from '$lib/types';

	// Shadcn UI imports
	import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import {
			DateFormatter,
			type DateValue,
			getLocalTimeZone
		} from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";

	// Lucide Icon Imports
	import CalendarIcon from "@lucide/svelte/icons/calendar";

  // --- Imports End ---

	let open: boolean = $state(false);
	let person: string = $state("");
	let amount: number = $state(0);
	let category: string = $state("");
	let account: string = $state("");
	let note: string = $state("");

	function resetForm() {
		person = "";
		amount = 0;
		category = "";
		account = "";
		note = "";
	}

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });
 
  let dateValue = $state<DateValue | undefined>();
  let contentRef = $state<HTMLElement | null>(null);
	
	var selectedMode: string = $state("expense");
	function handleSelect(mode: string) {
		selectedMode = mode;
		resetForm();
	}

	function addExpense() {
		toast("Expense added successfully!")
	}
</script>

<main>
	<div>
		<div class="flex items-center justify-around mt-4 ml-1 mr-1 p-2 rounded-2xl gap-2">
			<Button class="flex-1 border {selectedMode === 'income' ? 'border-blue-500 text-blue-500' : 'border-gray-800'}" onclick={() => handleSelect("income")} variant="ghost">Income</Button>
			<Button class="flex-1 border border-gray-800 {selectedMode === 'expense' ? 'border-red-500 text-red-500' : ''}" onclick={() => handleSelect("expense")} variant="ghost">Expense</Button>
			<Button class="flex-1 border border-gray-800 {selectedMode === 'transfer' ? 'border-green-600 text-green-600' : ''}" onclick={() => handleSelect("transfer")} variant="ghost">Transfer</Button>
		</div>
		<div class="mt-4">
      {#if selectedMode === "income" || selectedMode === "expense"}
        <form class="flex flex-col gap-4 px-4">
          <!-- Date -->
          <div class="flex items-center gap-4">
            <label for="date" class="w-24 text-sm font-medium">Date</label>
						<Popover.Root>
							<Popover.Trigger
								class={cn(
									buttonVariants({
										variant: "outline",
										class: "w-[280px] justify-start text-left font-normal"
									}),
									!dateValue && "text-muted-foreground"
								)}
							>
								<CalendarIcon />
								{dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : "Pick a date"}
							</Popover.Trigger>
							<Popover.Content bind:ref={contentRef} class="w-auto p-0">
								<Calendar type="single" bind:value={dateValue} />
							</Popover.Content>
						</Popover.Root>
          </div>

          <!-- Amount -->
          <div class="flex items-center gap-4">
            <label for="amount" class="w-24 text-sm font-medium">Amount</label>
						<Input type="number" placeholder="Enter amount" class="max-w-xs flex-1 p-2" bind:value={amount}/>
          </div>

          <!-- Category -->
          <div class="flex items-center gap-4">
            <label for="category" class="w-24 text-sm font-medium">Category</label>
            <Dialog.Root bind:open>
							<Dialog.Trigger class={cn(
									buttonVariants({
										variant: "outline",
										class: "flex-1 justify-start text-left font-normal"
									})
								)}>{category == "" ? "Select category" : category}</Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title>Pick expense category</Dialog.Title>
									<Dialog.Description>
										<div class="flex flex-wrap justify-around mt-4 gap-6">
											{#each CategoryTypes as { name, icon }}
												{@const Component = icon}
												<Button
													type="submit"
													variant="outline"
													size="lg"
													class="w-36 text-left"
													onclick={() =>  { category = name, open = false } }
												>
													<Component/>
													{name}
												</Button>
											{/each}
										</div>
									</Dialog.Description>
								</Dialog.Header>
							</Dialog.Content>
						</Dialog.Root>
          </div>

          <!-- Account -->
          <div class="flex items-center gap-4">
            <label for="account" class="w-24 text-sm font-medium">Account</label>
            <Input type="text" placeholder="Enter Account" class="max-w-xs flex-1 p-2" bind:value={account}/>
          </div>

          <!-- Note -->
          <div class="flex items-start gap-4">
            <label for="note" class="w-24 text-sm font-medium mt-2">Note</label>
            <Input type="text" placeholder="Enter note" class="max-w-xs flex-1 p-2" bind:value={note}/>
          </div>

					<div class="flex gap-2">
						<Button class="flex-3" variant="destructive" onclick={addExpense}>Add</Button>
						<Button class="flex-1" variant="outline" onclick={resetForm}>Reset</Button>
					</div>
        </form>
      {:else if selectedMode === "transfer"}
        <p class="text-center mt-4">Work in progress !</p>
      {/if}
    </div>
	</div>
</main>