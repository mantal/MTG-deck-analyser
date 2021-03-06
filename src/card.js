import Vue from 'vue';
import * as cache from './cache';

export function fetchCard(card) {
	"use strict";

	return cache.fetch(card.name)
		.then(c => c, () => {
			return Vue.http.get('http://mtg-deck-analyser.firebaseio.com/cards.json?orderBy="$key"&startAt="' + card.name + '"&endAt="' + card.name + '"')
				.then(r => {
					if (r.body[card.name] === undefined)
						return Promise.reject(card);
					return {
						...card,
						...r.body[card.name],
					};
				}).then(card => {
					cache.put(card);
					return card;
				});
		})
		.then(extendCard);
}

export function extendCard(card) {
	"use strict";
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
