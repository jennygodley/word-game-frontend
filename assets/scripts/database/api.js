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

const createWord = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/words',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      "word": {
        "word": formData.word.word,
        "user_id": store.user.id
      }
    }
  })
}

const deleteWord = function (dataId) {
  return $.ajax({
    url: config.apiUrl + '/words/' + dataId,
    method: 'DELETE'
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
        "word": formData.word.word,
        "user_id": store.user.user_id
      }
    }
  })
}

module.exports = {
  getWords,
  deleteWord,
  updateWord,
  createWord
}
