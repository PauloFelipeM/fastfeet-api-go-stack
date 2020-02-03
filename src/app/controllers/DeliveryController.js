import * as Yup from 'yup';
import Op from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';
import Courier from '../models/Courier';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { courier_id } = req.params;

    const courier = await Courier.findByPk(courier_id);

    if (!courier) return res.status(400).json({ error: 'Courier not found!' });

    const orders = await Order.findAll({
      where: {
        courier_id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.query)))
      return res.status(400).json({ error: 'Validation errors' });

    const { id } = req.params;
    const { start_date } = req.query;
    const order = await Order.findByPk(id);

    if (!order) return res.status(401).json({ error: 'Order not found!' });

    if (order.end_date)
      return res.status(401).json({ error: 'Order finished!' });

    const dateParse = parseISO(start_date);

    const orders = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(dateParse), endOfDay(dateParse)],
        },
      },
    });

    if (orders.length > 5)
      return res
        .status(401)
        .json({ error: 'You can only have five withdrawals per day' });

    await order.update({
      start_date: dateParse,
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation errors' });

    const { id } = req.params;
    const { end_date, signature_id } = req.body;
    const order = await Order.findByPk(id);

    if (!order) return res.status(401).json({ error: 'Order not found!' });

    if (!order.start_date)
      return res.status(401).json({ error: 'Order not started!' });

    await order.update({
      end_date: parseISO(end_date),
      signature_id: signature_id || null,
    });

    return res.json(order);
  }
}

export default new DeliveryController();
