// Icon Imports
import Food from "@lucide/svelte/icons/ice-cream-bowl";
import Transport from "@lucide/svelte/icons/bus";
import Shopping from "@lucide/svelte/icons/shopping-bag";
import Bills from "@lucide/svelte/icons/receipt-indian-rupee";
import Health from "@lucide/svelte/icons/scan-heart";
import Other from "@lucide/svelte/icons/rectangle-ellipsis";

export let CategoryTypes = [
	{ name: "Food", icon: Food },
	{ name: "Transport", icon: Transport },
	{ name: "Shopping", icon: Shopping },
	{ name: "Bills", icon: Bills },
	{ name: "Health", icon: Health },
	{ name: "Other", icon: Other }
];