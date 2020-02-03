import Mail from '../../lib/Mail';

class CancellationDelivery {
  get key() {
    return 'CancellationDelivery';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.courier.name} <${order.courier.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        courier: order.courier.name,
        order_id: order.id,
        product: order.product,
      },
    });
  }
}

export default new CancellationDelivery();
