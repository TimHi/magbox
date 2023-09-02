<script lang="ts">
	import type { LinkModel } from '$lib/model/Link';

	export let row: LinkModel;
	//TODO add onchange
</script>

{#key row.id}
	<label>
		<input type="checkbox" checked={row.read} />
		{#if row.read}
			Mark as Unread
		{:else}
			Mark as Read
		{/if}
	</label>
{/key}
