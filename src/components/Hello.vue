<template>
	<div>
		<div class="row">
			<chart :decklist="cards" variable="colors" chart="pie"></chart>
			<chart :decklist="cards" variable="types" chart="bar"></chart>
			<chart :decklist="cards" variable="subtypes" chart="bar" :filter="c => c.types && c.types.indexOf('Land')"></chart>

		</div>
		<div class="row">
			<div class="col s6">
				<textarea v-model.trim="deckListString" name="decklist" id="decklist" cols="30" rows="50" :change="saveDecklist()"></textarea>
			</div>
			<div class="col s6">
				<decklist :decklist="cards"></decklist>
			</div>
		</div>
	</div>
</template>

<script>
	import * as cards from '../card'
	import decklist from './Decklist.vue'
	import chart from './Chart.vue'

	export default {
		name: 'hello',
		data() {
			return {
				deckListString: ''
			}
		},
		asyncComputed: {
			cards: {
				default: [],
				get() {
					return Promise.all(this.deckListString.split('\n')
						.map(e => e.trim())
						.filter(e => e.length > 0)
						.map(cards.parseCard)
						.map(cards.fetchCard));
				}
			}
		},
		methods: {
			saveDecklist() {
				localStorage.decklistString = this.deckListString;
			}
		},
		created() {
			this.deckListString = localStorage.decklistString || "";
		},
		components: {
			decklist,
			chart
		}
	}
</script>
