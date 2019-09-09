'use strict'

const store = require('../store')
const databaseEvents = require('../database/events.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

const onNewGame = function () {
  $('#letter-input-div').show()
  $('#game-messages').text('')
  $('#used-letters').text('')
  $('#turns-left').text('')
  $('#word-here').text('')
  databaseEvents.onGetRandomWord()
  newGame()
  store.turnTimer = 5
}

const newGame = function () {
  store.usedLetters = []
  const wordArray = store.word.split('')
  store.wordArray = wordArray
  const spaceArray = wordArray.map(letter => '_ ')
  store.spaceArray = spaceArray
  $('#word-here').text(spaceArray.join(' '))
}

const onLetterInput = function (event) {
  event.preventDefault()
  // $('#letter-input').trigger('reset')
  const form = event.target
  const formData = getFormFields(form)
  aTurn(formData.letter)
  $('#letter-input-field').val('')
}

const checkForLoss = function () {
  if (store.turnTimer === 0) {
    $('#game-messages').text('you lost!')
    return true
  }
}

const checkForWin = function () {
  if ((store.spaceArray.join('')) === (store.wordArray.join(''))) {
    $('#game-messages').text('you win!')
    return true
  }
}

const noMatch = function (letter) {
  $('#game-messages').text('no matches!')
  $('#used-letters').text(store.usedLetters.join(' '))
  $('#used-letters').css('text-decoration', 'line-through')
  store.turnTimer--
  $('#turns-left').text(store.turnTimer + ' wrong guesses left')
}

const aTurn = function (letter) {
  const indices = []
  const matches = function (letter) {
    for (let i = 0; i < store.wordArray.length; i++) {
      if (store.wordArray[i] === letter.letter) {
        indices.push(i)
      }
    }
  }
  const findMatches = function () {
    for (let i = 0; i < indices.length; i++) {
      store.spaceArray.splice(indices[i], 1, letter.letter)
    }
  }
  matches(letter)
  findMatches()
  if (indices.length === 0) {
    store.usedLetters.push(letter.letter)
    noMatch(letter)
  } else {
    $('#game-messages').text('you got a match!')
  }
  $('#word-here').text(store.spaceArray.join(' '))
  checkForLoss()
  if (checkForLoss() === true) {
    $('#letter-input-div').hide()
  }
  checkForWin()
  if (checkForWin() === true) {
    $('#letter-input-div').hide()
  }
}

module.exports = {
  onNewGame,
  onLetterInput
}
