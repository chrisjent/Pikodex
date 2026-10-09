import { rebuildAllPikomon } from './pikomon.js'
import { fightButton, backButton } from './functions.js'
import { playAgainButton, resetButton } from './buttons.js'

// access #container div //
export const container = document.querySelector('#container')
container.innerHTML=(rebuildAllPikomon())


backButton.disabled = true
fightButton.disabled = true
playAgainButton.disabled = true
resetButton.disabled = false