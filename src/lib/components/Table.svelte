<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { tableCell } from '../actions/table';
	import type { ColumnDef } from '../types/table';

	import { getCellContent, getCellHeader, getHeaders, getRowColumns } from '../utils/table';

	import TableOrderIcon from './TableOrderIcon.svelte';

	const dispatch = createEventDispatcher();

	export let columns: ColumnDef[] = [];
	export let data: any[] | null = [];
	export let orderBy: string | undefined = undefined;
	export let orderDirection: 'asc' | 'desc' | undefined = undefined;

	export let classes: { th?: string; td?: string } = {};
	export let styles: { th?: string; td?: string } = {};

	$: order = { by: orderBy, direction: orderDirection };

	$: headers = getHeaders(columns);
	$: rowColumns = getRowColumns(columns);
</script>

<div class="table-container">
	<div class="table-wrapper">
		<table class="w-full {$$props.class}">
			<slot name="headers" {headers}>
				<thead>
					{#each headers ?? [] as headerRow}
						<tr>
							{#each headerRow ?? [] as column}
								<th
									use:tableCell={{ column }}
									class="column-{column.name} {classes.th}"
									class:whitespace-nowrap={orderBy}
									style={styles.th}
									on:click={(e) => dispatch('headerClick', { column })}
								>
									{getCellHeader(column)}
									<TableOrderIcon {order} {column} />
								</th>
							{/each}
						</tr>
					{/each}
				</thead>
			</slot>

			<slot />

			<slot name="data" {data} columns={rowColumns}>
				<tbody>
					{#each data ?? [] as rowData, rowIndex}
						<tr>
							{#each rowColumns ?? [] as column}
								<td
									use:tableCell={{ column, rowData, rowIndex }}
									class="column-{column.name} {classes.td}"
									style={styles.td}
									on:click={(e) => dispatch('cellClick', { column, rowData })}
								>
									{getCellContent(column, rowData, rowIndex)}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</slot>
		</table>
	</div>
</div>
