module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'recipients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      courier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'couriers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      signature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNul: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNul: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNul: true,
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
    return queryInterface.dropTable('orders');
  },
};
