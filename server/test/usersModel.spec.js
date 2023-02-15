const { expect, assert } = require('chai');
const config = require('../knexfile');
const knex = require('knex')(config);
const usersModel = require('../src/users/users.model');
const USERS_TABLE = usersModel.USERS_TABLE;
const userFixture = require('./testFixture');

describe('Users tests', () => {
  before(async () => {
    // showFixture = userFixture.getShow();
    // await knex('user_shows')
    //   .insert(showFixture[0])
    //   .returning('user_id')
    //   .then((result) => {
    //     console.log('inserted test customer');
    //   })
    //   .catch(console.error);
  });

  afterEach(async () => {
    await knex('tv_shows')
      .where('name', userFixture.getShow()[1].showName)
      .returning('name')
      .del()
      .then(() => {
        console.info('--- new test --');
      })
      .catch(console.info);

    await knex('user_shows')
      .where('user_id', userFixture.getShow()[1].user_id)
      .returning('user_id')
      .del()
      .then(() => {})
      .catch(console.info);
  });

  describe('setup', () => {
    it('should connect to database', () => {
      knex.raw('select 1 as result').catch(() => {
        assert.fail('unable to connect to database');
      });
    });

    it('has run the initial migration', () => {
      knex(USERS_TABLE)
        .select()
        .catch(() => assert.fail('customer table is not found.'));
    });
  });

  describe('getAllShows', () => {
    it('should return an array of shows name', async () => {
      const shows = await usersModel.getShowList(1);
      expect(shows).to.be.an.instanceof(Array);
      expect(shows[0].showname).to.be.equal('Sopranos');
    });
  });

  describe('postNewShow', () => {
    it('should add a new show to the tv_shows table if it does not exists', async () => {
      const newShow = userFixture.getShow();
      await usersModel.postNewShow(newShow[1]);
      const shows = await usersModel.getShowList(5);
      expect(shows[0].showname).to.be.equal('Cowboy Bebop');
    });
  });

  describe('deleteShow', () => {
    it('should delete from user_shows_table row matching user/show', async () => {
      const newShow = userFixture.getShow();
      await usersModel.postNewShow(newShow[1]);
      await usersModel.deleteShow(6, 5);
      const shows = await usersModel.getShowList(5);
      expect(shows[0]).to.be.equal(undefined);
    });
  });

  describe('updateProgress', () => {
    it('should update progress on user_shows', async () => {
      const newShow = userFixture.updateShow();
      await usersModel.postNewShow(newShow);
      newShow.season = 2;
      newShow.episode = 4;
      await usersModel.updateProgress(newShow);
      const shows = await usersModel.getShowList(5);
      expect(shows[0].season).to.be.equal(2);
      expect(shows[0].episode).to.be.equal(4);
    });
  });

  //
  // describe('getById', () => {
  //   describe('when customer exists', () => {
  //     it('should get customer by id', async () => {
  //       const customer = await customerModel.getById(customerFixture.id);
  //       expect(customer).to.exist;
  //       expect(customer.id).to.eq(customerFixture.id);
  //     });
  //   });
  //
  //   describe("when customer doesn't exist", () => {
  //     it('should return undefined', async () => {
  //       const customer = await customerModel.getById(45000);
  //       expect(customer).to.be.undefined;
  //     });
  //   });
  // });
  // describe('create', () => {
  //   const newId = 9999;
  //
  //   after(async () => {
  //     await knex
  //       .from(CUSTOMER_TABLE)
  //       .where('id', newId)
  //       .del()
  //       .catch(console.error);
  //
  //     console.log('Deleted test product');
  //   });
  //
  //   describe('with valid properties', () => {
  //     it('should be able to create a new customer', async () => {
  //       const newCustomer = {
  //         id: newId,
  //         email: 'test@example.com',
  //         last_name: 'Parker',
  //         postal_code: '55443',
  //       };
  //
  //       const id = await customerModel.create(newCustomer);
  //       const customer = await knex(CUSTOMER_TABLE)
  //         .select()
  //         .where('id', newId)
  //         .first();
  //       expect(customer).to.exist;
  //       expect(customer.id).to.eq(newId);
  //     });
  //   });
  //
  //   describe('with invalid parameters', () => {
  //     it('should throw an error', () => {
  //       assert.throws(() => {
  //         customerModel.create({
  //           bad_param: 'HELLO!',
  //         });
  //       }, 'Invalid field: bad_param');
  //     });
  //   });
  // });
  //
  // describe('update', () => {
  //   describe('with valid parameters', () => {
  //     after(async () => {
  //       await knex(CUSTOMER_TABLE)
  //         .update({
  //           first_name: null,
  //         })
  //         .where('id', customerFixture.id)
  //         .returning('id')
  //         .then((result) => {
  //           console.log('updated test customer');
  //         })
  //         .catch(console.error);
  //     });
  //
  //     it('should return the id', async () => {
  //       const id = await customerModel.update(customerFixture.id, {
  //         first_name: 'Bill',
  //       });
  //       expect(id).to.eq(customerFixture.id);
  //     });
  //
  //     it('should update the customer', async () => {
  //       const customer = await customerModel.getById(customerFixture.id);
  //       expect(customer.firstName).to.eq('Bill');
  //     });
  //   });
  //
  //   describe('when invalid parameters', () => {
  //     it("shouldn't update the customer", async () => {
  //       assert.throws(() => {
  //         customerModel.update(customerFixture.id, {
  //           favorite_food: 'Pizza',
  //         });
  //       }, 'Invalid field: favorite_food');
  //     });
  //   });
  // });
});