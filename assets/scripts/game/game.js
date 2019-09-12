'use strict'

const store = require('../store')
// const databaseEvents = require('../database/events.js')
// const databaseUi = require('../database/ui.js')
const databaseApi = require('../database/api.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

const setKittyOne = function () {
  $('.kitty-image').html('<img src="https://i.imgur.com/3AiMlNe.jpg">')
}

const onNewGame = function () {
  databaseApi.getRandomWord()
    .then(newGameSetup)
    .catch(console.error)
}

const onNewRandomGame = function () {
  databaseApi.getRandomOnlineWord()
    .then(newGameSetup)
    .catch(console.error)
}

const newGameSetup = function (data) {
  if (data === null) {
    $('#game-messages').html('please <a href="#" data-toggle="modal" data-target="#createWordModal">enter some words</a> first')
    $('#game-messages').addClass('failure')
    $('#used-letters').text('')
    $('#turns-left').text('')
    $('#word-here').text('')
    $('#letter-input-div').hide()
    return
  }
  if (data !== null) {
    store.word = data.word.word
  }
  if ((data.word.word === undefined) && (data !== null)) {
    store.word = data.word
  }
  if (store.word === undefined) {
    $('#game-messages').html('please <a href="#" data-toggle="modal" data-target="#createWordModal">enter some words</a> first')
    $('#game-messages').addClass('failure')
  } else if (data === null) {
    $('#game-messages').html('please <a href="#" data-toggle="modal" data-target="#createWordModal">enter some words</a> first')
    $('#game-messages').addClass('failure')
  } else {
    $('#letter-input-div').show()
    $('#game-messages').text('')
    $('#used-letters').text('')
    $('#turns-left').text('')
    $('#word-here').text('')
    store.turnTimer = 5
    newGame()
  }
}

const newGame = function () {
  setKittyOne()
  store.usedLetters = []
  const wordArray = store.word.split('')
  store.wordArray = wordArray
  const spaceArray = wordArray.map(letter => '_ ')
  store.spaceArray = spaceArray
  const letter = {letter: ' '}
  aTurn(letter)
  $('#word-here').html(store.spaceArray.join(' '))
}

const onLetterInput = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  if (!formData.letter.letter) {
    $('#game-messages').text('please enter a letter')
    $('#game-messages').removeClass('success')
    $('#game-messages').addClass('failure')
  } else if (store.usedLetters.includes(formData.letter.letter)) {
    $('#game-messages').text('please enter a new letter')
    $('#game-messages').removeClass('success')
    $('#game-messages').addClass('failure')
  } else {
    aTurn(formData.letter)
    $('#letter-input-field').val('')
  }
}

const checkForLoss = function () {
  if (store.turnTimer === 0) {
    $('#game-messages').text('you lost!')
    $('#game-messages').removeClass('success')
    $('#game-messages').addClass('failure')
    $('#used-letters').text('')
    $('#turns-left').text('the word was ' + store.word)
    return true
  }
}

const checkForWin = function () {
  if ((store.spaceArray.join('')) === (store.wordArray.join(''))) {
    $('#game-messages').text('you win!')
    $('#game-messages').removeClass('failure')
    $('#game-messages').addClass('success')
    $('#used-letters').text('')
    $('#turns-left').text('')
    return true
  }
}

const noMatch = function (letter) {
  if (letter.letter !== ' ') {
    $('.kitty-image').html('<img src="https://i.imgur.com/QkbOtGM.jpg">')
    $('#game-messages').text('no matches!')
    $('#game-messages').removeClass('success')
    $('#game-messages').addClass('failure')
    $('#used-letters').text(store.usedLetters.join(' '))
    $('#used-letters').css('text-decoration', 'line-through')
    store.turnTimer--
    if (store.turnTimer > 1) {
      setTimeout(setKittyOne, 500)
      if (letter.letter === ' ') {
      }
      $('#turns-left').text(store.turnTimer + ' wrong guesses left')
    } else if (store.turnTimer === 1) {
      setTimeout(setKittyOne, 500)
      $('#turns-left').text(store.turnTimer + ' wrong guess left')
    } else if (store.turnTimer === 0) {
      $('#turns-left').text('')
    }
  }
}

const aTurn = function (letter) {
  letter.letter = letter.letter.toLowerCase()
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
      if (letter.letter === ' ') {
        store.wordArray.splice(indices[i], 1, '&nbsp;&nbsp;')
        store.spaceArray.splice(indices[i], 1, '&nbsp;&nbsp;')
      } else {
        store.spaceArray.splice(indices[i], 1, letter.letter)
      }
    }
  }
  matches(letter)
  findMatches()
  if ((indices.length === 0) && (letter !== ' ')) {
    store.usedLetters.push(letter.letter)
    noMatch(letter)
  } else if (letter.letter === ' ') {
  } else {
    $('#game-messages').text('you got a match!')
    $('#game-messages').removeClass('failure')
    $('#game-messages').addClass('success')
  }
  $('#word-here').html(store.spaceArray.join(' '))
  checkForLoss()
  if (checkForLoss() === true) {
    $('#letter-input-div').hide()
    $('.kitty-image').html('<img src="https://i.imgur.com/Z4DsEFy.jpg">')
  }
  checkForWin()
  if (checkForWin() === true) {
    $('#letter-input-div').hide()
    // $('#word-here').text('')
  }
}

module.exports = {
  onNewGame,
  onLetterInput,
  onNewRandomGame,
  newGameSetup
}
