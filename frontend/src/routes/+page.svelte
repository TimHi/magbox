<script lang="ts">
	import { PocketBaseService } from '$lib/service/pocketbase';
	import { onDestroy, onMount } from 'svelte';
	import LinkTable from '../components/LinkTable.svelte';
	import LoginButton from '../components/LoginButton.svelte';
	import type { LinkModel } from '$lib/model/Link';
	import Error from '../components/Error.svelte';
	import AddLink from '../components/AddLink.svelte';
	import { isUserLoggedIn } from '$lib/store/store';
	import Landing from '../components/Landing.svelte';
	const pocketBaseService = new PocketBaseService();
	let tablePromise: Promise<LinkModel[] | undefined>;
	let loggedIn = false;
	const unsubscribe = isUserLoggedIn.subscribe((value) => (loggedIn = value));

	onDestroy(unsubscribe);

	onMount(() => {
		isUserLoggedIn.set(pocketBaseService.IsUserLoggedIn());
		tablePromise = pocketBaseService.GetLinks();
	});
	function handleNewData(event: CustomEvent) {
		tablePromise = pocketBaseService.GetLinks();
	}
</script>

{#if loggedIn}
	<div class="flex items-center">
		<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
			Magbox
		</h1>
		<div class="ml-auto">
			<LoginButton />
		</div>
	</div>
	<AddLink on:message={handleNewData} />
	{#await tablePromise}
		<span class="loading loading-spinner loading-md" />
	{:then linkData}
		<LinkTable {linkData} />
	{:catch error}
		<Error errorMessage={error.errorMessage} />
	{/await}
{:else}
	<Landing />
{/if}
