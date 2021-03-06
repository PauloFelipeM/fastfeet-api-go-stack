import * as Yup from 'yup';
import Recipient from '../models/Recipient';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  street: Yup.string().required(),
  number: Yup.string().required(),
  complement: Yup.string(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  postal_code: Yup.string().required(),
});

class RecipientController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const recipients = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'street',
        'numer',
        'complement',
        'state',
        'city',
        'postal_code',
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(recipients);
  }

  async getOne(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    return res.json(recipient);
  }

  async store(req, res) {
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient)
      return res.status(401).json({ error: 'Recipient Not Found!' });

    await recipient.update(req.body);
    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Recipient.destroy({ where: { id } });
    return res.json({ message: 'Repicient successfully deleted' });
  }
}

export default new RecipientController();
