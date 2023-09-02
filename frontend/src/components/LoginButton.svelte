<script lang="ts">
  import { PocketBaseService } from '$lib/service/pocketbase';
  import { isUserLoggedIn } from '$lib/store/store';

  const pocketBaseService = new PocketBaseService();
  
  let signInPromise: Promise<boolean>;

  function handleLogin() {
    signInPromise = pocketBaseService.SignInUsingOAuth2();
  }
</script>


<div>
  {#if $isUserLoggedIn}
    <button class="btn btn-primary" on:click={() => {
      pocketBaseService.Logout();
    }}>Log out</button>
  {:else}
    <button class="btn btn-primary" on:click={handleLogin}>Log in</button>
  {/if}
</div>
