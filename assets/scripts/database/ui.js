'use strict'

const showWordsTemplate = require('../templates/get-words.handlebars')
const getFormFields = require('./../../../lib/get-form-fields.js')

const store = require('../store')

const getWordsSuccess = function (data) {
  if (data.words.length === 0) {
    $('#get-words-messages').removeClass('success')
    $('#get-words-messages').addClass('failure')
    $('#get-words-messages').text("you haven't entered any words")
  } else {
    const showWordsHtml = showWordsTemplate({ words: data.words })
    $('#get-words-messages').html(showWordsHtml)
  }
}

const getRandomWordSuccess = function (data) {
  if (data !== null) {
    store.word = data.word.word
  }
}

const getRandomWordFailure = function (data) {
  $('#game-messages').text('something\'s gone wrong')
  $('#game-messages').addClass('failure')
}

const getWordsFailure = function () {
  $('#get-words-messages').removeClass('success')
  $('#get-words-messages').addClass('failure')
  $('#get-words-messages').text('something\'s gone wrong').delay(2000).fadeOut()
}

const createWordSuccess = function () {
  $('#create-words-messages').removeClass('failure')
  $('#create-words-messages').addClass('success')
  $('#create-word-form').trigger('reset')
  $('#create-words-messages').text('').fadeToggle()
  $('#create-words-messages').text('successfully updated').delay(2000).fadeOut()
}

const createWordFailure = function () {
  $('#create-words-messages').removeClass('success')
  $('#create-words-messages').addClass('failure')
  $('#create-words-messages').text('something\'s gone wrong').delay(2000).fadeOut()
}

const updateWordSuccess = function () {
  $('#update-word-messages').removeClass('failure')
  $('#update-word-messages').addClass('success')
  $('#update-word-form').trigger('reset')
  $('#update-word-messages').text('successfully created').delay(2000).fadeOut()
}

const updateWordFailure = function () {
  $('#update-word-messages').removeClass('success')
  $('#update-word-messages').addClass('failure')
  $('#update-word-messages').text('something\'s gone wrong').delay(2000).fadeOut()
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
  createWordFailure,
  updateWordFailure,
  getRandomWordFailure
}
