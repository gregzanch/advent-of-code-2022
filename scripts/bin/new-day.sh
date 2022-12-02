#!/usr/bin/env sh


DIRECTORY="src/day$1"

if [ ! -d "$DIRECTORY" ]; then
  echo "creating $DIRECTORY";
  cp -R templates/day $DIRECTORY;
  node -e "require('./scripts/write-days.js')()";
  node -e "require('./scripts/write-test.js')($1)"
else
  echo "$DIRECTORY already exists";
fi

