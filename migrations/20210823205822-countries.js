
module.exports = {
  up: async ({ context: db }) => {
    const {Country} = db;
    await Country.create({
      id: 'ba',
      name: 'Bosnia and Herzegovina',
      phoneCode: '+387'
    });
  },

  down: ({ context: db }) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
