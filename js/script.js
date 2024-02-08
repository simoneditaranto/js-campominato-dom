// Il computer deve generare 16 numeri casuali e inserirli in un array, in base al range della difficoltà prescelta (se abbiamo scelto facile l'array conterrà numeri casuali da 1 a 100, se invece abbiamo scelto difficile l'array dovrà contenerne da 1 a 49): questi rappreseranno le posizioni delle nostre bombe.

// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).


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


        // in base alla scelta dell'utente decido quante celle devo visualizzare in pagina
        // il valore sarà il numero di iterazioni del ciclo for
        let userDifficulty = 100; // valore di default
        if(difficultyElement.value == 2) {

            userDifficulty = 81;
            document.querySelector(".container").className = "container medium";

        } else if(difficultyElement.value == 3) {

            userDifficulty = 49;
            document.querySelector(".container").className = "container easy";
        } else {

            document.querySelector(".container").className = "container";

        }

        // prendiamo la griglia 
        // utilizzando un ciclo for, per ogni iterazione creiamo una cella nella griglia

        // creo poi un array di numeri casuali di lunghezza "userDifficulty" e ad ogni iterazione del ciclo qui sotto inserisco ad ogni cella come numero l'i-esimo elemento dell'array
        const randomNumbersArray = getRandomNumbersArrys(userDifficulty, userDifficulty);

        // creo un array di 16 numeri casuali (compresi tra 1 e "userDifficulty") che saranno i numeri che contengolo le bombe
        const randomBombsArray = getRandomNumbersArrys(16, userDifficulty);
        console.log(randomBombsArray);
        // test

        // creazione griglia "userDifficulty" x "userDifficulty"
        for(let i = 0; i < userDifficulty; i++) {
        
            // creiamo l'elemtno
            const newElement = document.createElement("div");
            newElement.classList.add("square");
            newElement.innerText = randomNumbersArray[i];

            newElement.addEventListener("click", 
                function() {

                    // al click controllo se il numero presente nella casella fa parte dell'array di bombe
                    console.log(randomBombsArray.includes(Number(this.innerText)));
                    // test
                    if(randomBombsArray.includes(Number(this.innerText))) {
                        // se presente coloro la casella di rosso
                        this.classList.add("bomb");

                    } else {
                        // coloro la casella di azzurrino
                        this.classList.add("active");
                    }

                    // al click stampo il contenuto del mio elemento
                    console.log(this.innerText);

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
