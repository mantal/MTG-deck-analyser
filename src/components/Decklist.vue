<template>
	<div>
		<form @submit.prevent="addCard" class="row">
			<div class="input-field col s6">
				<input type="text" v-model.trim.lazy="cardInput" id="card-input" class="validate">
				<label for="card-input">Add card</label>
			</div>
		</form>
		<div class="row">
			<div v-for="card in decklist" class="decklist-viewer">
				<div class="col s4">{{ card.count }} {{ card.name }}</div>
				<div class="decklist-viewer-icons s4">
					<button @click="decreaseCardCount(card)"><i class="fa fa-minus" aria-hidden="true"></i></button>
					<button @click="increaseCardCount(card)"><i class="fa fa-plus" aria-hidden="true"></i></button>
					<button @click="removeCard(card)"><i class="tiny material-icons">delete</i></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as cards from '../card';

	export default {
		props: {
			decklist: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				cardInput: ''
			}
		},
		methods: {
			addCard() {
				cards.fetchCard(cards.parseCard(this.cardInput)).then(card => {
					this.cardInput = '';
					if (this.decklist.some(c => c.name === card.name))
						return;
					let dl = this.decklist;
					dl.push(card);
					this.$emit('update', dl);
				})
				.catch(card => alert('Card not found: ' + card.name));
			},
			removeCard(card) {
				let dl = this.decklist.filter(c => c.name !== card.name);
				this.$emit('update', dl);
			},
			decreaseCardCount(card) {
				let dl = this.decklist.map(c => {
					if (c.name === card.name)
						c.count--;
					return c;
				}).filter(c => c.count > 0);
				this.$emit('update', dl);
			},
			increaseCardCount(card) {
				let dl = this.decklist.map(c => {
					if (c.name === card.name)
						c.count++;
					return c;
				});
				this.$emit('update', dl);
			}
		}
	}
</script>

<style scoped>
	.decklist-viewer {
		text-align: left;
		vertical-align: middle;
	}
</style>
