const express = require('express');
const server = express();
const userController = require('./users/user.controller');
const showsController = require('./users/shows.controller');

server.use(express.json());

const serverEndpoints = () => {
  // SHOWS REQUESTS
  // GET ALL SHOWS INFORMATION FOR USER
  server.get('/user/shows', showsController.getShowList);
  // POST NEW SHOW INTO USER/SHOW TABLE
  server.post('/user/shows', showsController.postNewShow);
  // UPDATE PROGRESS IN SPECIFIC SHOW
  server.put('/user/shows', showsController.updateProgress);
  // DELETE SHOW FROM USER/SHOW TABLE
  server.delete('/user/shows', showsController.deleteShow);

  //USER REQUESTS
  // GET USER
  server.get('/user', userController.getUser);
  //USER AUTHENTICATION && || ADD NEW USER IF NO authToken
  server.post('/user', userController.createUser);
  //REMOVE USER ACCOUNT
  server.delete('/user', userController.deleteUser);
  //UPDATE USER INFO // PASSWORD RESET BUTTON
  server.update('/user', userController.updateUser);

  return server;
};

module.exports = { serverEndpoints };
