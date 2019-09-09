#!/bin/bash

curl "https://desolate-chamber-26085.herokuapp.com/random" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}"

echo
