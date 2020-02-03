import * as Yup from 'yup';
import Order from '../models/Order';
import Courier from '../models/Courier';
import Queue from '../../lib/Queue';
import NewDelivery from '../jobs/NewDelivery';

const schema = Yup.object().shape({
  product: Yup.string().required(),
  recipient_id: Yup.number().required(),
  courier_id: Yup.number().required(),
});

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const order = await Order.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(order);
  }

  async store(req, res) {
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations errors' });

    const { product, recipient_id, courier_id, signature_id } = req.body;

    const courier = await Courier.findByPk(courier_id);

    if (!courier) return res.status(400).json({ error: 'Invalid courier' });

    const order = await Order.create({
      product,
      recipient_id,
      courier_id,
      signature_id: signature_id || null,
    });

    await Queue.add(NewDelivery.key, { courier, order });

    return res.json(order);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations errors' });

    const { product, recipient_id, courier_id, signature_id } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(401).json({ error: 'Order Not Found!' });

    await order.update({
      product,
      recipient_id,
      courier_id,
      signature_id: signature_id || null,
    });

    return res.json(order);
  }

  async delete(req, res) {
    await Order.destroy({ where: { id: req.params.id } });
    return res.json({ message: 'Order successfully deleted' });
  }
}

export default new OrderController();
