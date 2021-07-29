let nCards = 0;

function validadeNumberOfCards(n){
    if (n%2 === 0 && n>=4 && n<=14 && n!==NaN){
        return true;
    }else{
        return false;
    }
}

function createCards(n){
    const container = document.querySelector(".cards-container");
    
    let cardsHTML = "";
    for(i=0; i<n; i++){
        cardsHTML+=`<div class="card"></div>`;
    }
    container.innerHTML = cardsHTML;
}

while (!validadeNumberOfCards(nCards)){
    nCards = prompt("Com quantas cartas deseja jogar? (Deve ser um número par, min:4 max:14 )");
}

createCards(nCards);


