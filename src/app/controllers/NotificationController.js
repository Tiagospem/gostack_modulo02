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

  async update(req, res) {
    // const notifications = await Notification.findById(req.params.id);
    // busca a notificação, atualiza e tras os novos dados
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true }
    );
    return res.json(notification);
  }
}
export default new NotificationController();
