import { database } from './database.js'
import { buildPikomon } from './pikomon.js'
import { pickCards, fight, back } from './buttons.js'

// access #container div //
export const container = document.querySelector('#container')
container.innerHTML=(buildPikomon(database))


//access buttons and add event listeners
export const pickCardsButton = document.querySelector('#pickCardsBtn')
pickCardsButton.addEventListener("click", pickCards)

export const fightButton = document.querySelector('#fightBtn')
fightButton.addEventListener("click", fight)

export const backButton = document.querySelector('#backBtn')
backButton.addEventListener("click", back)

backButton.disabled = true
fightButton.disabled = true