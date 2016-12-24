import Vue from 'vue';

export function fetchCard(card) {
	"use strict";

	return Vue.http.get('http://mtg-deck-analyser.firebaseio.com/cards.json?orderBy="$key"&startAt="' + card.name + '"&endAt="' + card.name + '"')
		.then(r => {
			return {
				...card,
				...r.body[card.name],
			};
		})
		.then(extendCard);
}

export function extendCard(card) {
	"use strict";

	if (!card.colors) {
		card.colors = ['colorless'];
	}
	return card;
}

export function parseCard(card) {
	"use strict";

	let m = card.match(/(^\w+):/);
	const b = m ? parseBoard(m[1]) : 'Mainboard';

	let cardName = card.replace(/^\w+:/, '').trim();

	m = cardName.match(/^\d+/g);
	let n = m ? parseInt(m[0]): 1;
	if (n <= 0)
		console.log('bad number: ', n);//TODO

	return {
		count: n,
		board: b,
		name: cardName.replace(/^\d+/, '').trim()
	};
}

export function parseBoard(board) {
	"use strict";
	switch (board.toLocaleUpperCase().replace(/ /g, '')) {
		case 'SB':
			return 'Sideboard';
		case 'MB':
			return 'Maybeboard';
		case 'CM':
		case 'C':
			return 'Commander';
		default:
			return board;
	}
}
