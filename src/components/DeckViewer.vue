<template>
	<div>
		<div class="row">
			<div class="">
				<decklist :decklist="deck.decklist" @update="updateDecklist"></decklist>
			</div>
		</div>
		<div class="row">
			<chart :decklist="deck.decklist" variable="colors" chart="pie"></chart>
			<chart :decklist="deck.decklist" variable="types" chart="bar"></chart>
			<chart :decklist="deck.decklist" variable="subtypes" chart="bar" :filter="c => c.types && c.types.indexOf('Land')"></chart>

		</div>
	</div>
</template>

<script>
	import * as cards from '../card'
	import decklist from './Decklist.vue'
	import chart from './Chart.vue'

	export default {
		name: 'DeckViewer',
		data() {
			return {
				deck: {
					name: '',
					decklist: []
				}
			}
		},
		methods: {
			saveDeck() {
				localStorage.deck = JSON.stringify(this.deck);
			},
			importFromFile(e) {
				let file = e.target.files[0];
				if (!file)
					return;

				let reader = new FileReader();
				reader.onload = e => {
					let deckListString = e.target.result;

					Promise.all(deckListString.split('\n')
						.map(e => e.trim())
						.filter(e => e.length > 0)
						.map(cards.parseCard)
						.map(cards.fetchCard))
					.then(decklist => {
						this.decklist = decklist;
						this.saveDeck();
					});
				};
				reader.readAsText(file);
			},
			updateDecklist(decklist) {
				this.deck.decklist = decklist;
				this.saveDeck();
			}
		},
		created() {
			if (localStorage.deck)
				this.deck = JSON.parse(localStorage.deck);
		},
		components: {
			decklist,
			chart
		}
	}
</script>
