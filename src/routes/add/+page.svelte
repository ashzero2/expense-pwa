<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
 
  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });
 
  let value = $state<DateValue | undefined>();
  let contentRef = $state<HTMLElement | null>(null);
	
	var selectedMode: string = "income";
	function handleSelect(mode: string) {
		selectedMode = mode;
	}
</script>

<main>
	<div>
		<div class="flex items-center justify-around mt-4 ml-1 mr-1 p-2 rounded-2xl gap-2">
			<Button class="flex-1 border {selectedMode === 'income' ? 'border-blue-500 text-blue-500' : 'border-gray-800'}" onclick={() => handleSelect("income")} variant="ghost">Income</Button>
			<Button class="flex-1 border border-gray-800 {selectedMode === 'expense' ? 'border-red-500 text-red-500' : ''}" onclick={() => handleSelect("expense")} variant="ghost">Expense</Button>
			<Button class="flex-1 border border-gray-800 {selectedMode === 'transfer' ? 'border-amber-50 text-white' : ''}" onclick={() => handleSelect("transfer")} variant="ghost">Transfer</Button>
		</div>
		<div class="mt-">
      {#if selectedMode === "income"}
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
									!value && "text-muted-foreground"
								)}
							>
								<CalendarIcon />
								{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
							</Popover.Trigger>
							<Popover.Content bind:ref={contentRef} class="w-auto p-0">
								<Calendar type="single" bind:value />
							</Popover.Content>
						</Popover.Root>
          </div>

          <!-- Amount -->
          <div class="flex items-center gap-4">
            <label for="amount" class="w-24 text-sm font-medium">Amount</label>
						<Input type="number" placeholder="Enter amount" class="max-w-xs flex-1 p-2" />
          </div>

          <!-- Category -->
          <div class="flex items-center gap-4">
            <label for="category" class="w-24 text-sm font-medium">Category</label>
            <Input type="text" placeholder="Enter note" class="max-w-xs flex-1 p-2" />
          </div>

          <!-- Account -->
          <div class="flex items-center gap-4">
            <label for="account" class="w-24 text-sm font-medium">Account</label>
            <Input type="text" placeholder="Enter note" class="max-w-xs flex-1 p-2" />
          </div>

          <!-- Note -->
          <div class="flex items-start gap-4">
            <label for="note" class="w-24 text-sm font-medium mt-2">Note</label>
            <Input type="text" placeholder="Enter note" class="max-w-xs flex-1 p-2" />
          </div>
        </form>
      {:else if selectedMode === "expense"}
        <p class="text-center mt-4">Expense form goes here</p>
      {:else if selectedMode === "transfer"}
        <p class="text-center mt-4">Transfer form goes here</p>
      {/if}
    </div>
	</div>
</main>