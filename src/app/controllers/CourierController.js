import * as Yup from 'yup';
import Courier from '../models/Courier';
import File from '../models/File';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
});

class CourierController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const courier = await Courier.findAll({
      attributes: ['id', 'name', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });
    return res.json(courier);
  }

  async store(req, res) {
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations errors' });

    const { name, email, avatar_id } = req.body;

    const courier = await Courier.create({
      name,
      email,
      avatar_id: avatar_id || null,
    });

    return res.json(courier);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations errors' });

    const { name, email, avatar_id } = req.body;

    const courier = await Courier.findByPk(req.params.id);
    await courier.update({
      name,
      email,
      avatar_id: avatar_id || null,
    });

    return res.json(courier);
  }

  async delete(req, res) {
    await Courier.destroy({ where: { id: req.params.id } });
    return res.json({ message: 'Courier successfully deleted' });
  }
}

export default new CourierController();
