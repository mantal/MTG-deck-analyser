export function importCard(card) {
	"use strict";

}

export function importBoard(board) {
	"use strict";
	switch (board.toLocaleLowerCase().replace(/ /g, '')) {
		case 'SB':
			return 'Sideboard';
		case 'MB':
			return 'Maybeboard';
		case 'C':
			return 'Commander';
	}
}
