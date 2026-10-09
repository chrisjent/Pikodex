import { database, backup } from './database.js'
import { buildPikomon } from './pikomon.js'
import { announceWinnerEliminateLoser, checkForFinalTwo, checkForFinalWinner, updateLives, pickCardsButton, fightButton, backButton, loserCards, updateEliminatedList } from './functions.js'

let selectedCards = []

//target message element
export const buttonMessageHTML = document.querySelector('#buttonMessage')

const fightSounds = ["BOOM!!", "POW!!", "BAM!!", "WHAM!!", "ZAP!!", "KAPOW!!", "BIFF!!", "SMACK", "THWACK!!", "CRASH!!", "BONK!!", "WHOOSH!!", "KRAK!!", "SPLAT!!", "ZONK!!", "CLANG!!", "SOCK!!", "THUD!!", "KABLAM!!", "ZOWIE!!"]

//functions to selet 2 card from the database array
export const pickCards = () => {
    selectedCards = [];
    while (selectedCards.length !== 2) { //selects 2 cards from random in the array
        let randomCard = database[Math.floor(Math.random()* database.length)]
        if (!selectedCards.includes(randomCard)) {
            selectedCards.push(randomCard)
        }
    }
    buttonMessageHTML.innerHTML = `
            ${selectedCards[0].name} VS ${selectedCards[1].name}!
        `
    container.innerHTML=(buildPikomon(selectedCards))
    pickCardsButton.disabled = true;
    backButton.disabled = true;
    fightButton.disabled = false;
}

//function to simulate fight between selected cards
export const fight = () => {
    let loser = [selectedCards[Math.floor(Math.random()*selectedCards.length)]] 
    updateLives(loser[0]) 
    if (selectedCards[0].lives > 0 && selectedCards[1].lives > 0) {
        container.innerHTML=(buildPikomon(selectedCards)) 
        buttonMessageHTML.innerHTML = `${fightSounds[Math.floor(Math.random()*fightSounds.length)]}`
    } 
    else if (selectedCards[0].lives === 0 ) { 
    announceWinnerEliminateLoser(selectedCards[1],selectedCards[0])

    } else if (selectedCards[1].lives === 0 ) {
    announceWinnerEliminateLoser(selectedCards[0],selectedCards[1])
    }
    checkForFinalWinner()
}

export const back = () => {
    selectedCards = []
    container.innerHTML=(buildPikomon(database))
    buttonMessageHTML.innerHTML = "";
    pickCardsButton.disabled = false;
    fightButton.disabled = true;
    backButton.disabled = true;
    checkForFinalTwo()
}



let playAgain = () => {
    database.splice(0, database.length)
    database.push(...backup)
    container.innerHTML=(buildPikomon(database)) 
    loserCards.splice(0, loserCards.length)
    updateEliminatedList()
    buttonMessageHTML.innerHTML = "";
    pickCardsButton.disabled = false;
    playAgainButton.disabled = true;
    fightButton.disabled = true;
    
}

let resetGame = () => {
    playAgain()
}

export const resetButton = document.querySelector('#resetBtn')
resetButton.addEventListener("click", resetGame)



export const playAgainButton = document.querySelector('#playAgainBtn')
playAgainButton.addEventListener("click", playAgain)














