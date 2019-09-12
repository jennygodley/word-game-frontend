#!/bin/bash

curl "https://desolate-chamber-26085.herokuapp.com/words" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "word": {
      "word": "'"${WORD}"'"
    }
  }'

echo
