let nCards = 0;
let hasFippledCard = false;
let flippedCards = 0;
let moves =0;
let firstCard, secondCard;
let freezeBoard = false;

function comparador() { 
	return Math.random() - 0.5; 
}

const parrotsGifs = ["../assets/metalparrot.gif", "../assets/bobrossparrot.gif", "../assets/explodyparrot.gif", "../assets/fiestaparrot.gif", "../assets/revertitparrot.gif", "../assets/tripletsparrot.gif", "../assets/unicornparrot.gif"];
parrotsGifs.sort(comparador);

function validadeNumberOfCards(n){
    if (n%2 === 0 && n>=4 && n<=14 && n!==NaN){
        return true;
    }else{
        return false;
    }
}

function createCouples(){
    //create couples of random cards
    let cards=[];
    let parrotsIndex = 0;
    for(let i=0; i<(nCards/2); i++){
        for(let j=0; j<2; j++){
            cards.push(parrotsGifs[parrotsIndex]);
        }
        parrotsIndex++;
    }
    cards.sort(comparador);
    return cards;    
}

function stampCards(cardStamps){
    let divCards = document.querySelectorAll(".card");
    for (let i=0; i<divCards.length; i++){
        divCards[i].querySelector(".back").style.backgroundImage = "url("+cardStamps[i]+")";
    }
    return divCards;
}

function createCards(){
    //create card divs
    const container = document.querySelector(".cards-container");
    for(let i=0; i<nCards; i++){
        container.innerHTML+=`
        <div class="card">
            <div class="front face"></div>
            <div class="back face"></div>
        </div>`;
    }
    const shuffledCards = createCouples();  
    let finalDeck = stampCards(shuffledCards);
    return finalDeck;
}

function endGame(){
    let end;
    if(flippedCards==nCards){
        end = true;
    }else{
        end = false;
    }
    return end;
}
function freezeCards(){
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    flippedCards+=2;
    resetBoard();
}

function resetGame(){
    resetBoard();
    alert("Bora jogar denovo!");
    window.location.reload(1);
}

function resetBoard(){
    freezeBoard = false;
    hasFippledCard = false;
    firstCard = null;
    secondCard = null;
}

function unflip(){
    freezeBoard = true;
    setTimeout(function waiting(){
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1000);
}

function checkCardsMatch(){
    if (firstCard.querySelector(".back").style.backgroundImage === secondCard.querySelector(".back").style.backgroundImage){
        freezeCards();
        return;
    }
    unflip();
}

function flip(){
    if(freezeBoard===true){return;} 
    if(this===firstCard){return;}
    this.classList.add('flip');
    moves++;
    if(!hasFippledCard){
        hasFippledCard = true;
        firstCard = this;
    }else{
        secondCard=this;
        checkCardsMatch();
        if(endGame()){
            alert(`Parabéns você ganhou em ${moves} jogadas!`);
            resetGame();
        }
    } 
}


//main
while (!validadeNumberOfCards(nCards)){
    nCards = prompt("Com quantas cartas deseja jogar? (Deve ser um número par, min:4 max:14 )");
}
const cards = createCards(nCards);
cards.forEach(card => card.addEventListener("click", flip));

