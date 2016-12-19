<template>
	<div class="row">
		<div v-for="card in decklist" class="decklist-viewer">
			{{ card.count }} {{ card.name }}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			decklist: {
				type: Array,
				required: true
			}
		}
	}
</script>

<style scoped>
	.decklist-viewer {
		text-align: left;
	}
</style>
