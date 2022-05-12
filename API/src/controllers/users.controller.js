const debug = require('debug')('User_Controller');
const usersDataMapper = require('../database/models/users.datamapper');
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

const usersController = {
  async createUser(req, res) {
    const user = req.body;
    const result = await usersDataMapper.createUser(user);
    res.status(201).json(result);
  },

  async logUser(req, res) {
    const user = req.body;
    const result = await usersDataMapper.logUser(user);
    const accessToken = jwtMethods.createAccessToken(result);
    const refreshToken = jwtMethods.createRefreshToken(result);
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res.status(200).json(result);
  },

  logOutUser(req, res) {
    if(!req.session.user){
      throw new APIError('You are not logged.')
    };
    delete req.session.user;
    res.status(200).json('You have successfuly logged out.');
  },

  async getUserById(req,res) {
    const userId = req.params.userId;
    const results = await usersDataMapper.getUserById(userId);
    res.status(200).json(results);
  },

  async getUsersList(_,res) {
    const results = await usersDataMapper.getUsersList();
    res.status(200).json(results);
  },

  async deleteUser(req,res) {
    const userId = req.params.userId;
    const results = await usersDataMapper.deleteUserWithPseudo(userId);
    res.status(200).json(results);
  }
};

module.exports = usersController;