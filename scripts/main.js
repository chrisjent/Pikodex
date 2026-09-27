import { database } from './database.js'
import { buildPikomon } from './pikomon.js'
import { pickCardsTrigger, fight, clear } from './buttons.js'

export const container = document.querySelector('#container')
container.innerHTML=(buildPikomon(database))


const pickCardsButton = document.querySelector('#pickCardsBtn')
pickCardsButton.addEventListener("click", pickCardsTrigger)

const fightButton = document.querySelector('#fightBtn')
fightButton.addEventListener("click", fight)

const clearButton = document.querySelector('#clearBtn')
clearButton.addEventListener("click", clear)