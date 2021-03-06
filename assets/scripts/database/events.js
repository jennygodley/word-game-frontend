
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../../lib/get-form-fields.js')
const store = require('./../store')

const onGetWords = function (event) {
  api.getWords()
    .then(ui.getWordsSuccess)
    .catch(ui.getWordsFailure)
}

const onDeleteWord = function (event) {
  const dataId = $(event.target).data('id')
  const formData = getFormFields(event.target)

  api.deleteWord(dataId, formData)
    .then(function () {
      onGetWords(event)
      $('#update-modal').modal('hide')
    },
    $('#get-words-alerts').html('success <hr>').show(),
    $('#get-words-alerts').html('success <hr>').delay(2000).fadeOut(),
    $('#get-words-alerts').removeClass('failure'),
    $('#get-words-alerts').addClass('success'))
    .catch(ui.failure)
}

const onUpdateWord = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.updateWord(formData)
    .then(function () {
      onGetWords(event)
      $('#update-modal').modal('hide')
    },
    $('#get-words-alerts').html('success <hr>').show(),
    $('#get-words-alerts').html('success <hr>').delay(2000).fadeOut(),
    $('#get-words-alerts').removeClass('failure'),
    $('#get-words-alerts').addClass('success'))
    .catch(ui.updateWordFailure)
}

const onUpdateWordForm = event => {
  $('#update-word-field').attr('placeholder', '')
  $('#update-word-field').val(store.word)
}

const onCreateWord = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.createWord(formData)
    .then(ui.createWordSuccess)
    .catch(ui.createWordFailure)
}

const onUpdateLink = event => {
  store.dataId = $(event.target).data('id')
  store.word = $(event.target).data('word')
}

const onGetApiKey = event => {
  api.getApiKey()
    .then(ui.getApiKeySuccess)
    .catch(ui.failure)
}

const onGetRandomOnlineWord = event => {
  api.getRandomOnlineWord()
    .then(ui.getRandomOnlineWordSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('.signed-in-options').on('click', '.delete-button', onDeleteWord)
  $('.signed-in-options').on('submit', '#create-word-form', onCreateWord)
  $('.signed-in-options').on('click', '.update-link', onUpdateLink)
  $('.signed-in-options').on('click', '.update-link', onUpdateWordForm)
}

module.exports = {
  onGetWords,
  onDeleteWord,
  onUpdateWord,
  addHandlers,
  onCreateWord,
  onUpdateLink,
  onUpdateWordForm,
  onGetApiKey,
  onGetRandomOnlineWord
}
