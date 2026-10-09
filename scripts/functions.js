import { buttonMessageHTML, pickCards, playAgainButton, back, fight } from './buttons.js'
import { database, backup } from './database.js'
import {buildPikomon} from './pikomon.js'

export let loserCards = []
const loserListHTML = document.querySelector('#loserList')

//funtion to check for winner of each round. Announces winner and resets lives back to 5, and removes loser from database and adds to the eliminated list. 
export const announceWinnerEliminateLoser = (winningCard, losingCard) => {
    let winner = [winningCard];
    let loser = [losingCard];
    container.innerHTML=(buildPikomon(winner))
    buttonMessageHTML.innerHTML = ` 
        <span class="winner-text">${winner[0].name} wins!</span>
        <br>
        <span class="loser-text">${loser[0].name} is eliminated<span>
    `                                           
    winner[0].lives = 5;
    let loserIndex = database.findIndex(card => card.id === loser[0].id)
    database.splice(loserIndex, 1)
    loserCards.push(loser[0])
    updateEliminatedList() 
    backButton.disabled = false
    fightButton.disabled = true 
}

//function to check for final 2 opponents
export const checkForFinalTwo = () => {
    if (database.length === 2){
        pickCards()
        buttonMessageHTML.innerHTML = `
        <span class="final-match">Final Match!!!</span>
        <br>
        ${database[0].name} and ${database[1].name} 
    `                    
    }
}

//function to check for final winner
export const checkForFinalWinner = () => {
    if (database.length === 1){
    buttonMessageHTML.innerHTML = `
        ${database[0].name} WINS THE GAME!!!  
    `
    backButton.disabled = true   
    playAgainButton.disabled = false;    
                   
    }
}

//function to update lives left during fight
export const updateLives = (card) => {
    card.lives -= 1
    return card.lives
}

//function to update HTML list of eliminated players
export const updateEliminatedList = () => {
    let loserList = "";
    for (const card of loserCards) {
            loserList += `<li>${card.name}</li>`
        }
        loserListHTML.innerHTML = loserList
}

//access buttons and add event listeners
export const pickCardsButton = document.querySelector('#pickCardsBtn')
pickCardsButton.addEventListener("click", pickCards)

export const fightButton = document.querySelector('#fightBtn')
fightButton.addEventListener("click", fight)

 export const backButton = document.querySelector('#backBtn')
backButton.addEventListener("click", back)
