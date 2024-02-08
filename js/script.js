// Il computer deve generare 16 numeri casuali e inserirli in un array, in base al range della difficoltà prescelta (se abbiamo scelto facile l'array conterrà numeri casuali da 1 a 100, se invece abbiamo scelto difficile l'array dovrà contenerne da 1 a 49): questi rappreseranno le posizioni delle nostre bombe.

// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// BONUS 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.

// BONUS 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.


// memorizzo il bottone "genera" che al click farà visualizzare la griglia
buttonStartElement = document.querySelector("#start");

// BONUS
// memorizzo in una variabile la difficoltà scelta dall'utente
let difficultyElement = document.querySelector("#choice");


buttonStartElement.addEventListener("click",


    function() {

        // memorizzo l'elemento griglia ("grid") 
        const gridElement = document.querySelector("#grid");
        
        // ad ogni pressione del button, il contenuto della griglia si deve azzerare
        gridElement.innerHTML = "";
        // ad ogni pressione del button, svuoto il contenuto della console
        console.clear();
        
        // memorizzo in una variabile il punteggio dell'utente, viene resettato a 0 ad ogni nuova partita
        let userScore = 0;

        // memorizzo l'elemento che stamperà il risultato a schermo
        const resultElement  = document.querySelector("#result");
        // ad ogni nuova partita l'elemento nel DOM che stampa il risultato non deve essere visibile
        resultElement.style.display = "none";

        // ad ogni nuova partita resetto il "pointer-events" della griglia
        gridElement.classList.remove("no-events");

        // in base alla scelta dell'utente decido quante celle devo visualizzare in pagina
        // il valore sarà il numero di iterazioni del ciclo for
        let userDifficulty = 100; // valore di default
        // variabile che mi serve per dare la grandezza agli elementi che creo successivamente
        let dimension;
        if(difficultyElement.value == 2) {

            userDifficulty = 81;
            dimension = "medium"; // nome della classe css

        } else if(difficultyElement.value == 3) {

            userDifficulty = 49;
            dimension = "small"; // nome della classe css

        } 

        // prendiamo la griglia 
        // utilizzando un ciclo for, per ogni iterazione creiamo una cella nella griglia

        // creo poi un array di numeri casuali di lunghezza "userDifficulty" e ad ogni iterazione del ciclo qui sotto inserisco ad ogni cella come numero l'i-esimo elemento dell'array
        const randomNumbersArray = getRandomNumbersArrys(userDifficulty, userDifficulty);

        // creo un array di 16 numeri casuali (compresi tra 1 e "userDifficulty") che saranno i numeri che contengolo le bombe
        const randomBombsArray = getRandomNumbersArrys(16, userDifficulty);

        // memorizzo in un array tutti gli elementi che creo
        const newElementsArray = [];

        // creazione griglia "userDifficulty" x "userDifficulty"
        for(let i = 0; i < userDifficulty; i++) {
        
            // creiamo l'elemtno
            const newElement = document.createElement("div");
            newElement.classList.add("square");
            newElement.classList.add(dimension);
            newElement.innerText = randomNumbersArray[i];
            newElement.style.color = "white";
            
            // aggiungo l'elemento al mio array
            newElementsArray.push(newElement);

            newElement.addEventListener("click", 
            function() {

                // creo una variabile booleana che controlla se l'utente ha cliccato su una bomba
                let isWinning = true;
                
                // al click controllo se il numero presente nella casella fa parte dell'array di bombe
                if(randomBombsArray.includes(Number(this.innerText))) {

                    // se presente coloro la casella di rosso
                    this.classList.add("bomb");

                    // chiamo la funzione che controlla le bombe per colorare di rosso tutte le caselle con le bombe
                    controlArrayNumbers(newElementsArray, randomBombsArray, "bomb");

                    // aggiorno il controllo 
                    isWinning = false;
                    // rendo non più cliccabile la griglia
                    gridElement.classList.add("no-events");

                } else {
                    
                    // controllo se la classe "active" non è già presente (cioè se la casella non è già stata cliccata)
                    if(!this.classList.contains("active")) {

                        // aumento il punteggio
                        userScore++;

                    } 

                    // coloro la casella di azzurrino
                    this.classList.add("active");

                }
                
                // se ho preso una bomba oppure se ho cliccato tutte le caselle giuste, stampo il risultato
                if(!isWinning) {

                    resultElement.style.display = "flex";
                    resultElement.innerText = `Hai perso, con un punteggio di ${userScore}`;

                } else if(userScore == (randomNumbersArray.length - randomBombsArray.length)){
                    gridElement.classList.add("no-events");
                    resultElement.style.display = "flex";
                    resultElement.innerText = `Hai VINTO, con un punteggio di ${userScore}`;
                }
            }
            )
        
            gridElement.append(newElement);
        
        }

    }
)


/* ___________________________________________________________________________ */
// FUNZIONI

// funzione per generare un numero casuale da 1 a "maxNumber"
function generateRandomNumber(maxNumber) {

    return Math.floor(Math.random() * maxNumber + 1);

}

// funzione per generare un array di "arrayLenght" numeri casuali e diversi tra loro
function getRandomNumbersArrys(arrayLenght, randomLimit) {

    // inizializzo un array vuoto
    const numbersArray = [];

    while(numbersArray.length < arrayLenght) {

        // genero un numero casuale
        const newNumber = generateRandomNumber(randomLimit);

        // controllo se il numero è già presente nell'array
        if(!numbersArray.includes(newNumber)) {

            // se non lo include, lo aggiungo
            numbersArray.push(newNumber);

        }

    }

    // ritorno il mio array
    return numbersArray;

}

// dichiaro una funzione che controlla quali elementi ci sono in comune tra 2 array e a quelli in comune aggiungo una classe
function controlArrayNumbers(firstArray, secondArray, nameClass) {

    // firstArray è un array di elementi html
    // secondArray è un array di numeri

    for(let i = 0; i < firstArray.length; i++) {

        if(secondArray.includes(Number(firstArray[i].innerText))) {
        
            firstArray[i].classList.add(nameClass);
        }

    }

}
