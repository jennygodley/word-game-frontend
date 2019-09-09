'use strict'

const authEvents = require('./auth/events')
const databaseEvents = require('./database/events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#password').on('submit', authEvents.onPassword)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('.star').on('click', authEvents.onStar)
  $('#get-words').on('click', databaseEvents.onGetWords)
  $('#update-word-form').on('submit', databaseEvents.onUpdateWord)
  databaseEvents.addHandlers()
})
