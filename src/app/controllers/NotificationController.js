import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    /**
     * check if provider id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!isProvider) {
      // unauthozired
      return res
        .status(401)
        .json({ error: 'Onl provider can load notifications' });
    }

    /**
     * get mongodb notification
     */
    const notificatios = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notificatios);
  }
}
export default new NotificationController();
