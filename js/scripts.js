let nCards = 0;
let hasFippledCard = false;
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

function createCouples(n){
    //create couples of random cards
    let cards=[];
    let parrotsIndex = 0;
    for(let i=0; i<(n/2); i++){
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

function createCards(n){
    //create card divs
    const container = document.querySelector(".cards-container");
    for(let i=0; i<n; i++){
        container.innerHTML+=`
        <div class="card">
            <div class="front face"></div>
            <div class="back face"></div>
        </div>`;
    }
    const shuffledCards = createCouples(n);  
    let finalDeck = stampCards(shuffledCards);
    return finalDeck;
}

function freezeCards(){
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    resetBoard();
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
    if(!hasFippledCard){
        hasFippledCard = true;
        firstCard = this;
    }else{
        secondCard=this;
        checkCardsMatch();
    } 
}


//main
while (!validadeNumberOfCards(nCards)){
    nCards = prompt("Com quantas cartas deseja jogar? (Deve ser um número par, min:4 max:14 )");
}
const cards = createCards(nCards);
cards.forEach(card => card.addEventListener("click", flip));

