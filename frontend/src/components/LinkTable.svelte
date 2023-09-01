<script>
	import { PocketBaseService } from '$lib/service/pocketbase';

	const pocketBaseService = new PocketBaseService();
	let tablePromise = pocketBaseService.GetLinks();
</script>

<p>
	{#await tablePromise}
		Loading...
	{:then planet}
		Result: {planet}.
	{:catch someError}
		System error: {someError.message}.
	{/await}
</p>

<button on:click={() => (tablePromise = pocketBaseService.GetLinks())}> Fetch Links </button>
