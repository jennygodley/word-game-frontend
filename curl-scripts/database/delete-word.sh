#!/bin/bash

curl "https://desolate-chamber-26085.herokuapp.com/words/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
