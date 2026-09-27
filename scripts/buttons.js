import { database } from './database.js'
import { buildPikomon } from './pikomon.js'
import {container} from './main.js'

//target message element
const messageHTML = document.querySelector('#buttonMessage')


export let selectedCards = []

//functions for buttons
export const pickCards = () => {
    selectedCards = [];
    for (let i=0; i < 2; i++) {
        selectedCards.push(database[Math.floor(Math.random()* database.length)])
    }
    messageHTML.innerHTML = `Cards Picked: ${selectedCards[0].name} and ${selectedCards[1].name}!`
    container.innerHTML=(buildPikomon(selectedCards))
}

// export const pickCardsTrigger = () => {
//     pickCards(database)
// }

export const fight = () => {
    if (selectedCards.length === 0) {
        messageHTML.innerHTML = "First, you must pick cards!"
    } else {
    const winner = [selectedCards[Math.floor(Math.random()*selectedCards.length)]]
    container.innerHTML=(buildPikomon(winner))
    messageHTML.innerHTML = `${selectedCards[1].name} WINS!`
    }
}

export const clear = () => {
    selectedCards = []
    container.innerHTML=(buildPikomon(database))
    messageHTML.innerHTML = `Cards cleared!`
}
