'use strict'

const config = require('./../config')
const store = require('./../store')

const getWords = function () {
  return $.ajax({
    url: config.apiUrl + '/words',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getRandomWord = function () {
  return $.ajax({
    url: config.apiUrl + '/random',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ''
  })
}

const createWord = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/words',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      "word": {
        "word": formData.word.word
      }
    }
  })
}

const deleteWord = function (dataId) {
  return $.ajax({
    url: config.apiUrl + '/words/' + dataId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateWord = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/words/' + store.dataId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      "word": {
        "user_id": store.dataId,
        "word": formData.word.word
      }
    }
  })
}

const getRandomOnlineWord = function () {
  return $.ajax({
    url: config.apiUrl + '/rapidapikey',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// const getRandomOnlineWord = function () {
//   return $.ajax({
//     "url": "https://wordsapiv1.p.rapidapi.com/words/?random=true",
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
//       "x-rapidapi-key": store.apiKey
//     }
//   })
// }

module.exports = {
  getWords,
  deleteWord,
  updateWord,
  createWord,
  getRandomWord,
  getRandomOnlineWord
}
