<script lang="ts">
	import type { LinkModel } from '$lib/model/Link';
	import { PocketBaseService } from '$lib/service/pocketbase';
	import LoginButton from './LoginButton.svelte';
	let tablePromise: Promise<LinkModel[] | undefined>;
	const pocketBaseService = new PocketBaseService();

	function handleClick() {
		tablePromise = pocketBaseService.GetLinks();
		console.log(pocketBaseService.IsUserLoggedIn());
	}
</script>

<LoginButton />
<h1>Welcome to Magbox</h1>

{#await tablePromise then data}
	<p>Aaaaal Gefangen: {data?.length}</p>
{/await}
<button on:click={handleClick}>Aaaaaaal</button>
