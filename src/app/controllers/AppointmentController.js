import * as Yup from 'yup';

import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { date, provider_id } = req.body;

    /**
     * Check if provider_id is a provider
     */

    const isprovider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isprovider) {
      return res
        .status(401)
        .json({ error: 'You can only appointments with providers' });
    }

    const appointments = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointments);
  }
}

export default new AppointmentController();
