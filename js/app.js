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

function newGame() {
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
}

newGame();

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
let flippedCard = []; //empty array
let matchCards = []; //empty match cards array


card.forEach(function(card) {
    card.addEventListener('click', function(e) {
   
      if(!card.classList.contains('open', 'show', 'match')) { 
        flippedCard.push(card); //card pushes into array
        card.classList.add('open', 'show'); //Add classes

        if (flippedCard.length == 2) { //If there are 2 cards
          if (flippedCard[0].isEqualNode(flippedCard[1])) { // If card 1 is equal to card 2
          	  flippedCard[0].classList.add('match'); // Add class to card 1
          	  flippedCard[1].classList.add('match'); // Add class to card 2
          	  console.log('Match');
              matchCards.push(card);
              if (matchCards.length === 8) {
		          alert('You Won!');
		          console.log('You won!');
	            }
          	  flippedCard = [];// empty the array
          } else { // If cards dont match 
                console.log('Not a Match!');
                setTimeout(function() {
                    flippedCard.forEach(function(card) {
                    card.classList.remove('open' , 'show') //remove classes
                  });

                flippedCard = []; //empty array
              }, 1000); // No match, cards flip over in 1 sec
            }
          }
       }
    });
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)x
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)x
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
