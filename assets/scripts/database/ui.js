'use strict'

const showWordsTemplate = require('../templates/get-words.handlebars')
const getFormFields = require('./../../../lib/get-form-fields.js')

const store = require('../store')

const getWordsSuccess = function (data) {
  const showWordsHtml = showWordsTemplate({ words: data.words })
  $('#get-words-messages').html(showWordsHtml)
}

const getWordsFailure = function () {
  $('#get-words-messages').text('something\'s gone wrong!').delay(1000).fadeOut()
}

const createWordSuccess = function () {
  $('#create-word-form').trigger('reset')
}

const updateWordSuccess = function () {
  $('#update-word-form').trigger('reset')
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  getWordsSuccess,
  getWordsFailure,
  createWordSuccess,
  updateWordSuccess,
  failure
}
