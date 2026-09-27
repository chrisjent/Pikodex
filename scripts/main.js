import { database } from './database.js'
import { buildPikomon } from './pikomon.js'
import { pickCards, fight, clear } from './buttons.js'

// access #container div //
export const container = document.querySelector('#container')
container.innerHTML=(buildPikomon(database))


//access buttons and add event listeners
const pickCardsButton = document.querySelector('#pickCardsBtn')
pickCardsButton.addEventListener("click", pickCards)

const fightButton = document.querySelector('#fightBtn')
fightButton.addEventListener("click", fight)

const clearButton = document.querySelector('#clearBtn')
clearButton.addEventListener("click", clear)