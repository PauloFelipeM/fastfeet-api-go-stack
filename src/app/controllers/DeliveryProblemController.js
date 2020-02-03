import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['product', 'canceled_at'],
        },
      ],
    });
    return res.json(deliveryProblems);
  }

  async view(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['product', 'canceled_at'],
          where: {
            id,
          },
        },
      ],
    });
    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json('Validation errors');

    const { id } = req.params;
    const { description } = req.body;
    const order = Order.findByPk(id);

    if (!order) return res.status(400).json('Order Not Found!');

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
