<template>
	<div class="row">
		<div class="col s6">
			<textarea v-model.trim="deckListString" name="deck-list" id="deck-list" cols="30" rows="50" :change="saveDecklist()"></textarea>
		</div>
		<div class="col s6">
			<decklist :decklist="cards"></decklist>
		</div>
	</div>
</template>

<script>
	import * as cards from '../card';
	import decklist from './Decklist.vue'

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
						.map(cards.importCard)
						.map(e => {
							return this.$http.get('http://mtg-deck-analyser.firebaseio.com/cards.json?orderBy="$key"&startAt="' + e.name + '"&endAt="' + e.name + '"')
								.then(r => {
									return {
										...e,
										...r.body[e.name],
									};
								});
						}));
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
			decklist
		}
	}
</script>
