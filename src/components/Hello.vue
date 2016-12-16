<template>
	<div>
		<textarea v-model.trim="deckListString" name="deck-list" id="deck-list" cols="30" rows="50"></textarea>
		<div v-for="card in deckList.cards">
			{{ card.board }}:  {{ card.count }} {{ card.name }}
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
				let res = this.deckListString.split('\n').map(e => {
					let m = e.match(/^(\w+):/);

					const b = m ? m[0] : 'Mainboard';

					e = e.replace(/^(\w+):/, '').trim();

					m = e.match(/^\d+/g);
					let n = m ? m[0] : 1;
					if (n <= 0)
						console.log('bad number: ', n);//TODO
					return {
						count: n,
						board: b,
						name: e.replace(/^\d+/, '').trim()
					};
				});
				return {
					cards: res
				}
			}
		}
	}
</script>
