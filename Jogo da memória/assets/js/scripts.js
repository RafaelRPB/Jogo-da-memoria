const cards =document.querySelectorAll(`.card`);
let hasFlippedCard=false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard(){ //verifica se ja foi selecionado uma carta anteriormente com o hasFlippedCard, se não, marca a primeira carta, se sim, marca a segunda carta
    
    if(lockBoard) return; //previne cartas de serem clicadas rapidamente, bugando o jogo (verificar unflipCards ).     
    if(this===firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
        return;
    }
    secondCard=this;
    hasFlippedCard=false;
    checkForMath();
}

function checkForMath(){ //verifica se a first e second card são a mesma e reage de acordo.
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards(){ //disabilita a carta de ser virada novamente (cartas iguais).
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}

function unflipCards(){ //vira novamente a carta para outra tentativa (cartas diferentes).
    lockBoard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500);

}

function resetBoard(){ //reseta o tabuleiro
    [hasFlippedCard,lockBoard]=[false, false]; 
    [firstCard,secondCard]=[null,null];
}

(function shuffleCards(){ //sorteia numeros  até 12.
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
})();

cards.forEach((card) =>{
    card.addEventListener('click',flipCard)
})

