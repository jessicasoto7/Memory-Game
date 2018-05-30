/*
 * Create a list that holds all of your cards x
 */
let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
"fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb",
"fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below x
 *   - loop through each card and create its HTML x
 *   - add each card's HTML to the page x
 */
cards = shuffle(cards);
console.log (cards);
const deck = document.querySelector('.deck');

for (let i=0; i < cards.length; i++) {
    const list = document.createElement('li');
    const cardIcon = document.createElement('i');
    deck.appendChild(list); //Add li to .deck
    list.classList.add('card'); //Add class
    list.appendChild(cardIcon); //Add i to li
    cardIcon.classList.add('fa', cards[i]);//Add class
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const card = document.querySelectorAll('.card');
const icon = document.getElementsByTagName('i');
function cardFlip () {
	for (let i = 0; i < card.length; i++) {
	    card[i].addEventListener('click', function() {          
          card[i].classList.add('open', 'show');
	    }); 
    } 
}
cardFlip();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
