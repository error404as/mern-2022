# MERN example

Based on: [Youtube: React + NodeJS. Fullstack приложение за 3 часа](https://www.youtube.com/watch?v=ivDjWYcKDZI) [Vladilen Minin]

Differences: Router v6, asketic UI, nodemon ignore.

## Project features

Includes **registration** and **authorization** with JWT token.

**Functionality**: create short links with tracking clicks.

## Not included config

**Requires**: mongo db connection link, e.g. [MongoDB Cloud](https://cloud.mongodb.com/). *./config/default.json -> mongoUri*

## Run code

**npm run dev** - starts express server and react dev server
**npm start** - for production

## Known issues

No logout on token expiration.

No delete link functionality.

