'use strict'

const showWordsTemplate = require('../templates/get-words.handlebars')
const getFormFields = require('./../../../lib/get-form-fields.js')

const store = require('../store')

const getWordsSuccess = function (data) {
  if (data.words.length === 0) {
    $('#get-words-messages').text("you haven't entered any words yet")
  } else {
    const showWordsHtml = showWordsTemplate({ words: data.words })
    $('#get-words-messages').html(showWordsHtml)
  }
}

const getRandomWordSuccess = function (data) {
  store.word = data.word.word
}

const getWordsFailure = function () {
  $('#get-words-messages').text('something\'s gone wrong').delay(2000).fadeOut()
}

const createWordSuccess = function () {
  $('#create-word-form').trigger('reset')
}

const updateWordSuccess = function () {
  $('#update-word-form').trigger('reset')
}

const randomFailure = (error) => {
  console.error('random funntion', error)
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  getWordsSuccess,
  getWordsFailure,
  createWordSuccess,
  updateWordSuccess,
  failure,
  getRandomWordSuccess,
  randomFailure
}
