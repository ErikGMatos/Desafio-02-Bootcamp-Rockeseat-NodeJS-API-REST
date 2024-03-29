import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificatioController {
  async index(req, res) {
    const checkIsprovider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkIsprovider) {
      return res
        .status(401)
        .json({ error: 'You can only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificatioController();
