// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
/*_______________________________________________________________________________________________________________________ */

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
        let userDifficulty = 100;
        // valore di default
        if(difficultyElement.value == 2) {

            userDifficulty = 81;
            document.querySelector(".container").className = "container medium";
            // document.querySelector(".container").style.width = "900px";

        } else if(difficultyElement.value == 3) {

            userDifficulty = 49;
            document.querySelector(".container").className = "container easy";
            // document.querySelector(".container").style.width = "700px";

        } else {

            document.querySelector(".container").className = "container";
            // document.querySelector(".container").style.width = "1000px";

        }

        // prendiamo la griglia 
        // utilizzando un ciclo for, per ogni iterazione creiamo una cella nella griglia

        // creo poi un array di numeri casuali di lunghezza "userDifficulty" e ad ogni iterazione del ciclo qui sotto inserisco ad ogni cella come numero l'i-esimo elemento dell'array
        const randomNumbersArray = getRandomNumbersArrys(userDifficulty);

        // creazione griglia "userDifficulty" x "userDifficulty"
        for(let i = 0; i < userDifficulty; i++) {
        
            // creiamo l'elemtno
            const newElement = document.createElement("div");
            newElement.classList.add("square");
            newElement.innerText = randomNumbersArray[i];

            newElement.addEventListener("click", 
                function() {

                    // al click aggiungo la classe .active (che colora di azzurrino la cella)
                    this.classList.toggle("active");
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
function getRandomNumbersArrys(arrayLenght) {

    // inizializzo un array vuoto
    const numbersArray = [];

    while(numbersArray.length < arrayLenght) {

        // genero un numero casuale
        const newNumber = generateRandomNumber(arrayLenght);

        // controllo se il numero è già presente nell'array
        if(!numbersArray.includes(newNumber)) {

            // se non lo include, lo aggiungo
            numbersArray.push(newNumber);

        }

    }

    // ritorno il mio array
    return numbersArray;

}
