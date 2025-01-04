//Pierre Feuille Ciseaux

const UserBox = document.querySelector('.UserInfo');
const Username = document.getElementById('Username');
const btnOk = document.getElementById('btnOk');
const regex = new RegExp('[A-Z,a-z]');
const score = document.querySelector(".score");
const action = document.querySelector(".action");
const jeu = document.querySelector(".jeu");
let resetBtn = document.getElementById('reset');
let playerScore = document.getElementById('score-joueur');
let ComputerScore = document.getElementById('score-ordinateur');
let PlayerBtn = [...document.getElementsByClassName('btn-joueur')];
let opierreBtn = document.getElementById('opierre');
let ofeuilleBtn = document.getElementById('ofeuille');
let ociseauxBtn = document.getElementById('ociseaux');
let msg = document.getElementById('message');
let nextBtn = document.getElementById('next');
let user = document.getElementById('user');

btnOk.addEventListener('click', () => {

    if(Username.value === ""){
        alert('Ce champ ne peut être vide!!');
    }
    else if( Username.value.length > 6){
        alert('le nom doit contenir 6 maximum');
    }
    else{
        user.innerHTML = Username.value;
        score.classList.toggle("active");
        action.classList.toggle("active");
        jeu.classList.toggle("active");
        UserBox.classList.toggle("active"); 
    }
});


const Play = (e) => {
    let choice = e.target.closest('.btn-joueur');

    PlayerBtn.forEach((btn) => {
        btn.classList.add("desactivated");
        btn.removeEventListener('click', Play);
    });

    choice.classList.remove("desactivated");
    choice.classList.add("active");

    let playerChoice = choice.id;

    let ComputerChoice = DoComputerChoice();
    CheckWinner(playerChoice, ComputerChoice);
    resetBtn.classList.add("active");

    nextBtn.classList.toggle('active');
};

const PIERRE = "pierre";

const FEUILLE = "feuille";

const CISEAUX = "ciseaux";

const DoComputerChoice = () => {

    let rand = Math.floor(Math.random() * 3);

    switch(rand){
        case 0:
            opierreBtn.classList.add("active");
            return PIERRE;
        case 1:
            ofeuilleBtn.classList.add("active");
            return FEUILLE;
        default:
            ociseauxBtn.classList.add("active");
            return CISEAUX;   
    }
};

const CheckWinner = (playerChoice, ComputerChoice) => {

   if(playerChoice === ComputerChoice){
    msg.textContent = "Egalité";
    return;
   }

   if(playerChoice === PIERRE){
    if(ComputerChoice === FEUILLE){
        return ComputerWin();
    }
    else if(ComputerChoice === CISEAUX){
        return PlayerWin();
    }
   }

   if(playerChoice === FEUILLE){
    if(ComputerChoice === CISEAUX){
        return ComputerWin();
    }
    else if(ComputerChoice === PIERRE){
        return PlayerWin();
    }
   }

   
   if(playerChoice === CISEAUX){
    if(ComputerChoice === PIERRE){
        return ComputerWin();
    }
    else if(ComputerChoice === FEUILLE){
        return PlayerWin();
    }
   }

};

const ComputerWin = () => {
    msg.textContent = "L'IA gagne ...";
    ComputerScore.textContent++;
}

const PlayerWin = () => {
    msg.textContent = "Vous avez gagné...";
    playerScore.textContent++;
}

const ContinueGame = () => {
    PlayerBtn.forEach((btn) => {
        btn.classList.remove('desactivated');
        btn.classList.remove('active');
        btn.addEventListener('click', Play);
    });

    nextBtn.classList.remove('active');
    opierreBtn.classList.remove('active');
    ofeuilleBtn.classList.remove('active');
    ociseauxBtn.classList.remove('active');

    msg.textContent = " A vous de jouer !";
};

nextBtn.addEventListener('click', ContinueGame);

PlayerBtn.forEach((btn) => btn.addEventListener('click', Play));

resetBtn.addEventListener('click', () => {
    playerScore.textContent = 0;
    ComputerScore.textContent = 0;
    ContinueGame();
});