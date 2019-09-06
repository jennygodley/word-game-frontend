'use strict'

const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
// const gameEvents = require('./../game/events')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onPassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.passwordReset(data)
    .then(ui.passwordSuccess)
    .catch(ui.passwordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onStar = function () {
  ui.showCredits()
}

module.exports = {
  onSignUp,
  onSignIn,
  onPassword,
  onSignOut,
  onStar
}
