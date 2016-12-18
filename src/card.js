export function importCard(card) {
	"use strict";

	let m = card.match(/(^\w+):/);
	const b = m ? importBoard(m[1]) : 'Mainboard';

	let cardName = card.replace(/^\w+:/, '').trim();

	m = cardName.match(/^\d+/g);
	let n = m ? m[0] : 1;
	if (n <= 0)
		console.log('bad number: ', n);//TODO

	return {
		count: n,
		board: b,
		name: cardName.replace(/^\d+/, '').trim()
	};
}

export function importBoard(board) {
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
