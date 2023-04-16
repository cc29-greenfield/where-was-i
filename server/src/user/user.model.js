const config = require('../../knexfile');
const knex = require('knex')(config);

const USERS_TABLE = 'users';
const TV_SHOWS_TABLE = 'tv_shows';
const USER_SHOW_TABLE = 'user_shows';
const AUTH_TABLE = 'auth';

module.exports = {
  USERS_TABLE,
  TV_SHOWS_TABLE,
  USER_SHOW_TABLE,
  AUTH_TABLE,

  async getUser(username) {
    return await knex(USERS_TABLE)
      .select({
        username: 'users.username',
        email: 'users.email',
        user_id: 'users.user_id',
      })
      .where('username', username);
  },

  async createUser(newUserObject) {
    await knex(USERS_TABLE).insert({
      username: newUserObject.username,
      email: newUserObject.email,
    });

    const userId = await knex(USERS_TABLE)
      .where('username', newUserObject.username)
      .returning('user_id');

    await knex(AUTH_TABLE).insert({
      auth_token: newUserObject.auth_token,
      user_id: userId[0].user_id,
    });
  },
};
