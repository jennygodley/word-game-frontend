#!/bin/bash

curl "https://desolate-chamber-26085.herokuapp.com/words/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "word": {
      "word": "'"${WORD}"'",
      "user_id": "'"${USERID}"'"
    }
  }'

echo
