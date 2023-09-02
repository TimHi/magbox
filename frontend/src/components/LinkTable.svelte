<script lang="ts">
	import type { LinkModel } from '$lib/model/Link';
	import SvelteTable from 'svelte-table';
	import ReadColumn from './ReadColumn.svelte';

	export let linkData: LinkModel[] | undefined;
	if (linkData === undefined) linkData = [];
	console.log(linkData);
	const rows = [...linkData];
	const columns = [
		{
			key: 'date',
			title: 'Added',
			value: (v: LinkModel) => v.created,
			sortable: true,
			headerClass: 'text-left'
		},
		{
			key: 'link',
			title: 'Link',
			value: (v: LinkModel) => v.link,
			sortable: true,
			headerClass: 'text-left'
		},
		{
			key: 'desc',
			title: 'Description',
			value: (v: LinkModel) => v.description,
			sortable: true,
			headerClass: 'text-left'
		},
		{
			key: 'read',
			title: 'Read',
			value: (v: LinkModel) => (v.read ? 'Read' : 'Unread'),
			renderComponent: {
				component: ReadColumn
			},
			sortable: true,
			headerClass: 'text-left'
		}
	];
</script>

<SvelteTable {columns} {rows} />
