import Dexie from 'dexie';

let db;

export function init() {
	"use strict";
	db = new Dexie("cards");
	db.version(100).stores({
		cards: "name"//first field = primary key
	});

}

export function fetch(name) {
	"use strict";
	return db.cards.get(name).then(card => {
		if (card === undefined)
			throw new Error('Card not found: ' + name);
		return card;
	});
}

export function put(card) {
	"use strict";
	db.cards.put(card).catch(e => {
		console.error(e);
	})
}
