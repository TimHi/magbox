<script>
	import { PocketBaseService } from '$lib/service/pocketbase';

	const pocketBaseService = new PocketBaseService();
	let tablePromise = pocketBaseService.GetLinks();
	let createPromise = pocketBaseService.CreateLink();
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

<button on:click={() => (tablePromise = pocketBaseService.GetLinks())}> Fetch Links </button>
<button on:click={() => (createPromise = pocketBaseService.CreateLink())}> Create Link </button>