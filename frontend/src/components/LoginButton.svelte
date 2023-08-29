<script>
	import { isUserLoggedIn } from '$lib/store/store';
</script>

<div class="bg-gray-400">
	{#if $isUserLoggedIn}
		<button
			on:click={() => {
				isUserLoggedIn.update((_) => false);
			}}>Log out</button
		>
	{:else}
		<button
			on:click={() => {
				isUserLoggedIn.update((_) => true);
			}}>Log in</button
		>
	{/if}
</div>
