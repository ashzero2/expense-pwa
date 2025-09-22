<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from "mode-watcher";
	import { onMount } from 'svelte';

  import Dashboard from "@lucide/svelte/icons/layout-dashboard";
	import Plus from "@lucide/svelte/icons/plus";
	import Rupee from "@lucide/svelte/icons/badge-indian-rupee";
	import Settings from "@lucide/svelte/icons/settings";

	let { children } = $props();

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newWorker = registration.installing;

			newWorker?.addEventListener('statechange', () => {
				if (newWorker.state === 'installed') {
					if (confirm('New version available. Refresh now?')) {
						newWorker.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	onMount(() => {
		detectSWUpdate();
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<ModeWatcher />
<div style="min-height: 100vh; display: flex; flex-direction: column;">
	<main style="flex: 1 0 auto;">
		{@render children?.()}
	</main>
	<nav class="bottom-nav border-t-4 border-b-gray-800 dark:border-gray-800">
		<a href="/" aria-label="Home">
			<Dashboard
				class="h-[1.2rem] w-[1.2rem]"
			/>
			<span>Home</span>
		</a>
		<a href="/add" aria-label="Add">
			<Plus
				class="h-[1.2rem] w-[1.2rem]"
			/>
			<span>Add</span>
		</a>
		<a href="/expenses" aria-label="Expenses">
			<Rupee
				class="h-[1.2rem] w-[1.2rem]"
			/>
			<span>Expenses</span>
		</a>
		<a href="/settings" aria-label="Settings">
			<Settings
				class="h-[1.2rem] w-[1.2rem]"
			/>
			<span>Settings</span>
		</a>
	</nav>
</div>

<style>
.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 0.5rem 0;
	z-index: 100;
}
.bottom-nav a {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	font-size: 0.9rem;
}
.bottom-nav a:active,
.bottom-nav a:focus {
	color: #0070f3;
}
.bottom-nav svg {
	margin-bottom: 2px;
}
@media (min-width: 600px) {
	.bottom-nav {
		display: none;
	}
}
</style>
