import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import Courier from '../app/models/Courier';
import Recipient from '../app/models/Recipient';
import Order from '../app/models/Order';
import DeliveryProblem from '../app/models/DeliveryProblem';
import databaseConfig from '../config/database';

const models = [User, Recipient, File, Courier, Order, DeliveryProblem];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new DataBase();
