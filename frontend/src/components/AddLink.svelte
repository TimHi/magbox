<script lang="ts">
	import type { LinkModel } from '$lib/model/Link';
	import { PocketBaseService } from '$lib/service/pocketbase';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	//TODO: Singleton
	const pocketBaseService = new PocketBaseService();
	let isModalOpen = false;
	let link: string = '';
	let description: string = '';

	function isValidUrl(url: string) {
		try {
			new URL(url);
			return true;
		} catch (err) {
			return false;
		}
	}
	function newDataDispatcher(record: Promise<LinkModel | undefined>) {
		record.then((v: LinkModel | undefined) => {
			if (v !== undefined) {
				dispatch('message', { linkModel: v });
			}
		});
	}
</script>

<button class="btn btn-secondary" on:click={() => (isModalOpen = true)}>Add new Link</button>

<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">New Link</h3>
		<form class="flex">
			<label>
				Link:
				<input type="text" bind:value={link} autocomplete="off" />
			</label>
			<label>
				Description:
				<input type="text" bind:value={description} autocomplete="off" />
			</label>
			<!-- TODO: Add Tags & Cateogires -->
		</form>
		<div class="modal-action">
			<button
				class="btn"
				on:click={() => {
					link = '';
					description = '';
					isModalOpen = false;
				}}>Cancel</button
			>
			<button
				class="btn"
				on:click={() => {
					//Here I need the values from the form
					console.log(link);
					if (isValidUrl(link)) {
						const record = pocketBaseService.CreateLink(link, description);
						if (record !== undefined) {
							newDataDispatcher(record);
						}
					} else {
						//TODO Handle better
						console.log('nvalid url');
					}
					link = '';
					description = '';
					isModalOpen = false;
				}}>Add</button
			>
		</div>
	</div>
</div>
