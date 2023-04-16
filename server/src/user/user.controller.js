const userModel = require('./user.model');

module.exports = {
  async createUser(req, res) {
    await userModel.createUser(req.body);
    res.status(201);
  },


  async getUser(req, res) {
    const userInfo = await userModel.getUser(req.query.username);
    res.status(201).send(userInfo);
  },
};
