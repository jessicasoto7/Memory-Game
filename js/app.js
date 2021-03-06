 //Array of cards
 let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
     "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb",
     "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"
 ];

 // New Game function. Shuffles and creates all cards and elements.
 function newGame() {
     cards = shuffle(cards);
     console.log(cards);
     const deck = document.querySelector(".deck");

     for (let i = 0; i < cards.length; i++) {
         const list = document.createElement("li");
         const cardIcon = document.createElement("i");

         deck.appendChild(list); //Add li to .deck
         list.classList.add("card"); //Add class
         list.appendChild(cardIcon); //Add i to li
         cardIcon.classList.add("fa", cards[i]); //Add class
     }
 }

 newGame();

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length,
         temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

 //Restart Game
 const restart = document.querySelectorAll(".restart");

 function restartClick(i) {
     return function() {
         location.reload();
         console.log("New Game");
     };
 }

 for (let i = 0; i < restart.length; i++) {
     restart[i].addEventListener("click", restartClick(i));
 }


 const time = setInterval(timer, 1000);
 let totalSeconds = 0;
 let moveCount = 1;
 moveCount.innerHTML = 0;

 function timer() { // Timer starts.
     ++totalSeconds;
     const hour = Math.floor(totalSeconds / 3600);
     const minute = Math.floor((totalSeconds - hour * 3600) / 60);
     const seconds = totalSeconds - (hour * 3600 + minute * 60);
     document.getElementById("timer").innerHTML = hour + " h " + " : " + minute + " min " + " : " + seconds + " s";
 }

 //Moves
 const star = document.querySelector(".stars");
 const moves = document.querySelector(".moves");




 //Winning Modal
 const winModal = document.getElementById("winningModal");
 let starScore = document.querySelector(".starsModal");
 let moveScore = document.querySelector(".movesModal");
 let timerScore = document.querySelector("#timerModal");
 let innerStars = document.querySelector(".stars");
 let innerMoves = document.querySelector(".moves");
 let innerTimer = document.querySelector("#timer");


 function winningModal() {
     starScore.innerHTML = innerStars.innerHTML;
     moveScore.innerHTML = innerMoves.innerHTML;
     timerScore.innerHTML = innerTimer.innerHTML;
     winModal.showModal();
     clearInterval(time);
 }

 //Game Over Modal
 const losingModal = document.getElementById("losingModal");

 function loseModal() {
     losingModal.showModal();
     clearInterval(time);
 }

 //close modals
 const cancelButton = document.querySelectorAll(".cancel");

 function cancelClick(i) {
     return function() {
         winModal.close();
         losingModal.close();
         clearInterval(time);
     };
 }


 for (let i = 0; i < cancelButton.length; i++) {
     cancelButton[i].addEventListener("click", cancelClick(i));
 }

 //Game functions, build off of Mike Wales webinar https://www.youtube.com/watch?v=_rUH-sEs68Y
 const card = document.querySelectorAll(".card");
 let flippedCard = []; //empty array
 let matchCards = []; //empty match cards array

 card.forEach(function(card) {
     card.addEventListener("click", function(e) {
         if (!card.classList.contains("open", "show", "match")) {
             flippedCard.push(card); //card pushes into array
             card.classList.add("open", "show"); //Add classes

             if (flippedCard.length == 2) { //If there are 2 cards
                 moves.innerHTML = moveCount++;
                 if (moveCount == 16) {
                     star.removeChild(star.lastElementChild);
                     console.log("You lost a life");
                 }

                 if (moveCount == 24) {
                     star.removeChild(star.lastElementChild);
                     console.log("You lost a life");
                 }

                 if (moveCount == 26) {
                     loseModal();
                 }
                 if (flippedCard[0].isEqualNode(flippedCard[1])) { // If card 1 is equal to card 2
                     flippedCard[0].classList.add("match"); // Add class to card 1
                     flippedCard[1].classList.add("match"); // Add class to card 2
                     console.log("Match");
                     matchCards.push(card);

                     if (matchCards.length === 8) { // 8 pairs match, you won game.
                         winningModal(); //placeholder for modal
                         console.log("You won!");
                     }

                     flippedCard = []; // empty the array

                 } else { // If cards dont match 
                     console.log("Not a Match!");
                     setTimeout(function() {
                         flippedCard.forEach(function(card) {
                             card.classList.remove("open", "show"); //remove classes
                         });
                         flippedCard = []; //empty array
                     }, 500); // No match, cards flip over in .75 sec
                 }
             }
         }
     });
 });

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