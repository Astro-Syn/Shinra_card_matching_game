const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let moves = 0;
const moveCounter = document.querySelector('.moves span');

function flipCard() {
    if(lockBoard || this.classList.contains('flip')) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if(flippedCards.length === 2){
        moves++;
        moveCounter.textContent = moves;
        checkForMatch();
    }
}

function checkForMatch(){
    const[firstCard, secondCard] = flippedCards;
    const firstImage = firstCard.querySelector('.front').dataset.tech;
    const secondImage = secondCard.querySelector('.front').dataset.tech;

    if(firstImage === secondImage){
        flippedCards = [];
        checkIfGameOver();
    }
    else{
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            flippedCards = [];
            lockBoard = false;
        }, 1500)
    }
}

function checkIfGameOver() {
    const flipped = document.querySelectorAll('.card.flip');
    if(flipped.length === cards.length){
        setTimeout(() => {
            document.querySelector('.final-move-count').textContent = moves;
            document.querySelector('.new-game-alert').classList.remove('hidden')
        }, 500);
    }
}

function resetGame (){
    flippedCards = [];
    lockBoard = false;
    moves = 0;
    moveCounter.textContent = moves;

    cards.forEach(card => {
        card.classList.remove('flip')
    })
    setTimeout(shuffleCards, 500);
}

function shuffleCards() {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * cards.length);
        card.style.order = random;
    })
}

cards.forEach(card => card.addEventListener('click', flipCard));
shuffleCards();




document.getElementById('restart-btn').addEventListener('click', () => {
    document.querySelector('.new-game-alert').classList.add('hidden');
    resetGame();
})

