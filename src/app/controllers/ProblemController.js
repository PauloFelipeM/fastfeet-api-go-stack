import Order from '../models/Order';
import Courier from '../models/Courier';
import Queue from '../../lib/Queue';
import CancellationDelivery from '../jobs/CancellationDelivery';

class ProblemController {
  async delete(req, res) {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!order) return res.status(400).json({ error: 'Order not found!' });

    await order.update({
      canceled_at: new Date(),
    });

    await Queue.add(CancellationDelivery.key, { order });

    return res.json(order);
  }
}

export default new ProblemController();
