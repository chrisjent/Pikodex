import { database } from './database.js'
import { buildPikomon } from './pikomon.js'
import { pickCardsButton, backButton, fightButton } from './main.js'

//target message element
const buttonMessageHTML = document.querySelector('#buttonMessage')
const loserListHTML = document.querySelector('#loserList')

let selectedCards = []
let loserCards = []
let card1 = selectedCards[0]
let card2 = selectedCards[1]
const fightSounds = ["BOOM!!", "POW!!", "BAM!!", "WHAM!!", "ZAP!!", "KAPOW!!", "BIFF!!", "SMACK", "THWACK!!", "CRASH!!", "BONK!!", "WHOOSH!!", "KRAK!!", "SPLAT!!", "ZONK!!", "CLANG!!", "SOCK!!", "THUD!!", "KABLAM!!", "ZOWIE!!"]

//funtion to check for winner of each round
const announceWinnerEliminateLoser = (winningCard, losingCard) => { //passing through 2 'cards' (objects) from the selectedCards array that we populated with pickCards
    let winner = [winningCard]; //assign first argument to winner array
    let loser = [losingCard]; //assign second argument to loser array
    container.innerHTML=(buildPikomon(winner)) //buildPikomon with winner card to display only this card
    buttonMessageHTML.innerHTML = ` 
        <span class="winner-text">${winner[0].name} wins!</span>
        <br>
        <span class="loser-text">${loser[0].name} is eliminated<span>
    `                                           //announce the winner in the HTML
    winner[0].lives = 5;   //reset the lives of the winner back to 5
    let loserIndex = database.findIndex(card => card.id === loser[0].id) // find the index of the loser card in the original database
    database.splice(loserIndex, 1)  //remove the loser card from the oroginal database array with splice
    loserCards.push(loser[0]) //push loser card to the loserCards array
    updateEliminatedList() //use updateElminated to update the list with the newest added card and display it in the list 
    backButton.disabled = false // show back button
    fightButton.disabled = true  // hide fight button

}
//function to check for final 2 opponents
const checkForFinalTwo = () => {
    if (database.length === 2){ //checks if database now has 2 items in it, if so......
    buttonMessageHTML.innerHTML = `
        Final Match!!!
        <br>
        ${database[0].name} and ${database[1].name}. 
    `                           //display it is the final match between cards 1 and 2
    selectedCards = [database[0], database[1]]. //assign selected Cards to cards 1 and 2 because we no longer need to "pickCards" when there are only 2 left
    pickCardsButton.disabled = true;  //hide pick cards button
    fightButton.disabled = false // show fight button
    }
}

//function to check for final winner
const checkForFinalWinner = () => {
    if (database.length === 1){ //checks if database now has 1 item in it, if so......
    buttonMessageHTML.innerHTML = `
        ${database[0].name} WINS THE GAME!!!
    `                               //display who wins the game
    }
}

//function to update HTML list of eliminated players
const updateEliminatedList = () => {
    let loserList = "" //reassign loserList to an empty string
    for (const card of loserCards) { //iterate through the loserCards array and add each item to an <li> and then update the HTML to this list
            loserList += `<li>${card.name}</li>`
            loserListHTML.innerHTML = loserList
        }
}

//function to update lives left during fight
const updateLives = (card) => { //removes 1 life from the card and returns the new life count
    card.lives -= 1
    return card.lives
}

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

const playAgain = () => {

}












