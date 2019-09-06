'use strict'

const store = require('./../store')
const gameEvents = require('./../game/events')

$('.signed-in-options').hide()

const signUpSuccess = function () {
  $('#signup_message').text('signed up successfully').delay(2000).fadeOut()
  $('#signup_message').removeClass()
  $('#signup_message').addClass('success')
  $('#sign-up').trigger('reset')
}

const signUpFailure = function () {
  $('#signup_message').text('sign-up failed')
  $('#signup_message').removeClass()
  $('#signup_message').addClass('failure')
  $('#sign-up').trigger('reset')
}

const signInSuccess = function (data) {
  store.user = data.user
  $('#signin_message').text('signed in successfully').delay(2000).fadeOut()
  $('#signin_message').text('').delay(2000).fadeIn()
  $('#signin_message').removeClass()
  $('#signin_message').addClass('success')
  $('#toggle').toggle()
  $('.signed-in-options').show()
  $('.sign-in-sign-up').hide(500)
  $('#sign-in').trigger('reset')
}

const signInFailure = function () {
  $('#signin_message').text('sign in failed')
  $('#signin_message').removeClass()
  $('#signin_message').addClass('failure')
  $('#sign-in').trigger('reset')
}

const passwordSuccess = function () {
  $('#password_message').text('password changed').delay(2000).fadeOut()
  $('#password_message').removeClass()
  $('#password_message').addClass('success')
  $('#password').trigger('reset')
}

const passwordFailure = function () {
  $('#password_message').text('password not changed')
  $('#password_message').removeClass()
  $('#password_message').addClass('failure')
  $('#password').trigger('reset')
}

const signOutSuccess = function () {
  store.user = null
  $('#signout_message').text('signed out').delay(1000).fadeOut()
  $('#signout_message').removeClass()
  $('#signout_message').addClass('success')
  $('#signin_message').text('')
  $('#toggle').toggle()
  $('.sign-in-sign-up').show()
}

const signOutFailure = function () {
  $('#signout_message').text('sign out failed').delay(5000).fadeOut()
  $('#signout_message').removeClass()
  $('#signout_message').addClass('failure')
}

const showCredits = function () {
  $('.jenny').text('made by jenny godley').fadeIn(100).delay(1000).fadeOut()
  setTimeout(() => {
    $('.jenny').text('★').fadeIn()
  }, 2000)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  passwordSuccess,
  passwordFailure,
  signOutSuccess,
  signOutFailure,
  showCredits
}
