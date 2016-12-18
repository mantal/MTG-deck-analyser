<template>
	<div>
		<textarea v-model.trim="deckListString" name="deck-list" id="deck-list" cols="30" rows="50"></textarea>
		<div v-for="card in cards">
			{{ card.board }}: {{ card.count }} {{ card.name }} ({{ card.cmc }})
		</div>
	</div>
</template>

<script>
	import * as cards from '../card';

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
					return Promise.all(this.deckListString.trim().split('\n')
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
		}
	}
</script>
