const showsModel = require('./shows.model');

module.exports = {
  async getShowList(req, res) {
    const allShows = await showsModel.getShowList(req.query.user_id);
    res.status(201).send(allShows);
  },

  async postNewShow(req, res) {
    await showsModel.postNewShow(req.body);
    await res.status(201).send('New show successfully added.');
  },

  async updateProgress(req, res) {
    await showsModel.updateProgress(req.body);
    res.status(201).send('Update Complete');
  },
  async deleteShow(req, res) {
    await showsModel.deleteShow(req.query.show_id, req.query.user_id);
    res.status(201).send('Deleted');
  },
};
