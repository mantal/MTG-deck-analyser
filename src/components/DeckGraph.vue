<template>
	<div>
		<!--<div :id="id"></div>-->
		<div id="test-pie"></div>
		<div id="test-pie-2"></div>
	</div>
</template>

<script>
	import dc from 'dc';
	import crossfilter from 'crossfilter';

	export default {
		props: {
			decklist: {
				type: Array,
				required: true
			},
			variable: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				id: Math.random() + '' + Math.random(),
			}
		},
		methods: {
			foo(variable) {
				let data = {};
				this.decklist.filter(e => e[variable]).forEach(card => {
					card[variable].forEach(type => {
						data[type] = (data[type] || 0) + 1;
					});
				});
				return Object.entries(data).map(e => { return { count: e[1], name: e[0] } }).sort((a, b) => a.count - b.count);
			}
		},
		watch: {
			decklist() {

				let data = this.foo('subtypes');
				let data1 = this.foo('types');

				if (data.length === 0 || data1.length === 0)
					return ;

				console.log(data);
				console.log(data1);

				let chart = dc.pieChart('#test-pie');
				let chart1 = dc.pieChart('#test-pie-2');

				let dim = crossfilter(data).dimension(e => e.name);
				let dim1 = crossfilter(data1).dimension(e => e.name);

				chart
					.width(300).height(150)
					.slicesCap(5)
					.legend(dc.legend())
					.on('pretransition', function(chart) {
						chart.selectAll('text.pie-slice').text(function(d) {
							return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
						})
					})
					.dimension(dim)
					.group(dim.group().reduceSum(e => { return e.count }));

				chart1
					.width(300).height(150)
					.slicesCap(5)
					.legend(dc.legend())
					.on('pretransition', function(chart) {
						chart.selectAll('text.pie-slice').text(function(d) {
							return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
						})
					})
					.dimension(dim1)
					.group(dim1.group().reduceSum(e => { return e.count }));

				dc.renderAll();
			}
		}
	}
</script>
