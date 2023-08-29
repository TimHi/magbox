<script>
	import { PocketBaseService } from '$lib/service/pocketbase';
	import { isUserLoggedIn } from '$lib/store/store';
	const pocketBaseService = new PocketBaseService();
</script>

<div class="bg-gray-400">
	{#if $isUserLoggedIn}
		<button
			on:click={() => {
				pocketBaseService.Logout();
				isUserLoggedIn.update((_) => false);
			}}>Log out</button
		>
	{:else}
		<button
			on:click={async () => {
				const success = pocketBaseService.SignInUsingOAuth2();
				isUserLoggedIn.update((_) => success);
			}}>Log in</button
		>
	{/if}
</div>
