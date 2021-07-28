let nCards = 0;

function validadeNumberOfCards(n){
    if (n%2 === 0 && n>=4 && n<=14 && n!==NaN){
        return true;
    }else{
        return false;
    }
}

function createCards(n){

}

while (!validadeNumberOfCards(nCards)){
    nCards = prompt("Com quantas cartas deseja jogar? (Deve ser um número par, min:4 max:14 )");
}



