module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNul: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNul: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNul: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNul: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
