<script lang="ts">
	import { PocketBaseService } from '$lib/service/pocketbase';
	import { onMount } from 'svelte';
	const pocketBaseService = new PocketBaseService();
	let createPromise: Promise<void>;
	let tablePromise: Promise<void>;

	function fetchLinks() {
		tablePromise = pocketBaseService.GetLinks();
	}

	function createLink() {
		createPromise = pocketBaseService.CreateLink();
	}

	onMount(() => {
		tablePromise = pocketBaseService.GetLinks();
	});
</script>

<p>
	{#await tablePromise}
		Loading...
	{:then planet}
		Result List: {planet}.
	{:catch someError}
		System error: {someError.message}.
	{/await}
</p>

<p>
	{#await createPromise}
		Loading...
	{:then planet}
		Result Create: {planet}.
	{:catch someError}
		System error: {someError.message}.
	{/await}
</p>

<button class="btn btn-primary" on:click={fetchLinks}> Fetch Links </button>

<button class="btn btn-primary" on:click={createLink}> Create Link </button>
