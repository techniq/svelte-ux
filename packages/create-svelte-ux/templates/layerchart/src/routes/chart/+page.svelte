<script lang="ts">
	import { Area, Axis, Chart, Highlight, Svg, Tooltip, TooltipItem } from 'layerchart';
	import { PeriodType, format } from 'svelte-ux';
	import { scaleTime } from 'd3-scale';

	import { data } from './data';
</script>

<main class="p-2">
	<h1 class="text-xl font-semibold mb-1">Area example</h1>
	<div class="h-[300px] p-4 border rounded">
		<Chart
			{data}
			x="date"
			xScale={scaleTime()}
			y="value"
			yDomain={[0, null]}
			yNice
			padding={{ left: 16, bottom: 24 }}
			tooltip
		>
			<Svg>
				<Axis placement="left" grid rule />
				<Axis placement="bottom" format={(d) => format(d, PeriodType.Day, 'short')} rule />
				<Area line={{ class: 'stroke-2 stroke-primary' }} class="fill-primary/30" />
				<Highlight points lines />
			</Svg>

			<Tooltip header={(data) => format(data.date, PeriodType.Day)} let:data>
				<TooltipItem label="value" value={data.value} />
			</Tooltip>
		</Chart>
	</div>
</main>
