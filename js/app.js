 //Array of cards
let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
"fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb",
"fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

// New Game function. Shuffles and creates all cards and elements.
function newGame() {
    cards = shuffle(cards);
    console.log (cards);
    const deck = document.querySelector('.deck');
    const moves = document.querySelector('.moves');

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

const restart = document.querySelector('.restart');
//New Game
restart.addEventListener('click', function(evt) {
    location.reload();
    alert('New Game');//placeholder for modal
})

//Timer function and adapted from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
const time = setInterval(timer, 1000);
let totalSeconds = 0;
let moveCount = 0;

function timer() { // Timer starts.
    ++totalSeconds;
    const hour = Math.floor(totalSeconds /3600);
    const minute = Math.floor((totalSeconds - hour*3600)/60);
    const seconds = totalSeconds - (hour*3600 + minute*60);
    document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

const star = document.querySelector(".stars");
const moves = document.querySelector(".moves");

function moveCounts() { 
	moveCount += 1;         
}

const card = document.querySelectorAll('.card');
let flippedCard = []; //empty array
let matchCards = []; //empty match cards array

const winModal = document.getElementById('winningModal');
const cancelButton = document.getElementById('cancel');

function winningModal() {
	winModal.showModal();
}

function loseModal() {
	losingModal.showModal();
   
}

cancelButton.addEventListener('click', function() {
    myModal.close();
});

card.forEach(function(card) {
    card.addEventListener('click', function(e) {
        moveCounts();
        if(!card.classList.contains('open', 'show', 'match')) { 
          flippedCard.push(card); //card pushes into array
          card.classList.add('open', 'show'); //Add classes

          if (flippedCard.length == 2) { //If there are 2 cards

            if (flippedCard[0].isEqualNode(flippedCard[1])) { // If card 1 is equal to card 2
          	    flippedCard[0].classList.add('match'); // Add class to card 1
          	    flippedCard[1].classList.add('match'); // Add class to card 2
          	    console.log('Match');
                matchCards.push(card);

                if (matchCards.length === 8) { // 8 pairs match, you won game.
		            winningModal(); //placeholder for modal
		            clearInterval(time);
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
                }, 750); // No match, cards flip over in .75 sec
            }
          }

          if(moveCount == 20) {
       	     star.removeChild(star.lastElementChild);
       	     console.log('You lost a life');
       	     moves.innerHTML = 2;
          }

          if(moveCount == 35) {
       	     star.removeChild(star.lastElementChild);
       	     console.log('You lost a life');
       	     moves.innerHTML = 1;
          }	
          if(moveCount == 40) {
       	    star.removeChild(star.lastElementChild);
       	    moves.innerHTML = 0;
          }
          if(moveCount >= 41) {
          	 loseModal();
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
