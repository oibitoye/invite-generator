#!/bin/sh
npm install
if [ ! -z "$APP_ENV" ] ; then
    npm run start
else
    npm run start
fi

