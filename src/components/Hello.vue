<template>
	<div>
		<textarea v-model.trim="deckListString" name="deck-list" id="deck-list" cols="30" rows="50"></textarea>
		<div v-for="card in deckList.cards">
			{{ card.board }}: {{ card.count }} {{ card.name }}
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
		computed: {
			deckList() {
				let res = this.deckListString.split('\n').map(cards.importCard);
				return {
					cards: res
				}
			}
		}
	}
</script>
