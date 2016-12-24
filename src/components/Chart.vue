<template>
	<div>
		<div :id="id"></div>
		<div id="test"></div>
		<div id="aaa"></div>
	</div>
</template>

<script>
	import crossfilter from 'crossfilter';
	import dc from 'dc'

	function randomString(n) {
		n = n || 7;
		return Array(n+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, n);
	}

	export default {
		props: {
			decklist: {
				type: Array,
				required: true
			},
			variable: {
				type: String,
				required: true
			},
			chart: {
				type: String,
				required: true
			},
			filter: {
				type: Function,
				required: false,
				default: () => true
			},
		},
		data() {
			return {
				id: 'L' + randomString(),//html id must start with a a letter
			}
		},
		watch: {
			decklist() { this.updateRender() },
			variable() { this.updateRender() },
			chart() { this.updateRender() },
			filter() { this.updateRender() }
		},
		methods: {
			updateRender() {
				let decklist = this.flatten(this.decklist.filter(this.filter), this.variable);

				if (!decklist)
					return ;

				let dim = crossfilter(decklist).dimension(e => e.name);

				switch (this.chart) {
					case 'pie':
					dc.pieChart('#' + this.id, this.id)
						.width(350).height(150)
						.legend(dc.legend())
						.dimension(dim)
						.group(dim.group().reduceSum(e => { return e.count }));
						break;
					case 'bar':
					dc.barChart('#' + this.id, this.id)
						.width(800).height(200)
						.xUnits(dc.units.ordinal)
						.x(d3.scale.ordinal())
						.renderlet(chart => { chart.selectAll('g.x text').attr('transform', 'translate(-10,10) rotate(315)'); })
						.dimension(dim)
						.group(dim.group().reduceSum(e => { return e.count }));
						break;
					default:
						console.error(this.chart + ': invalid chart type');
				}
				dc.renderAll(this.id);
			},
			flatten(decklist, variable) {
				let data = {};
				decklist.filter(e => e[variable]).forEach(card => {
					card[variable].forEach(type => {
						data[type] = (data[type] || 0) + card.count;
					});
				});
				return Object.entries(data).map(e => { return { count: e[1], name: e[0] } }).sort((a, b) => a.count - b.count);
			}
		}
	}
</script>
