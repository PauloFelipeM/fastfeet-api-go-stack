import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle({ data }) {
    const { courier, order } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Nova Entrega',
      template: 'delivery',
      context: {
        courier: courier.name,
        order_id: order.id,
        product: order.product,
      },
    });
  }
}

export default new NewDelivery();
