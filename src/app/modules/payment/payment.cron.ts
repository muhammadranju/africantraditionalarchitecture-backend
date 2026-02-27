import cron from 'node-cron';
import { DonationModel } from './stripe.model';

const paymentExpirationJob = () => {
  // Run once a day at midnight to check for abandoned payments
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('[Cron] Running daily abandoned payment cleanup job...');

      // Calculate the time 24 hours ago
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      // Find all donations that are 'pending' and older than 24 hours
      const result = await DonationModel.updateMany(
        {
          paymentStatus: 'pending',
          createdAt: { $lte: twentyFourHoursAgo },
        },
        {
          $set: { paymentStatus: 'cancelled' },
        },
      );

      if (result.modifiedCount > 0) {
        console.log(
          `[Cron] ✅ Successfully marked ${result.modifiedCount} abandoned payment(s) as 'cancelled'.`,
        );
      } else {
        console.log('[Cron] No abandoned payments found.');
      }
    } catch (error) {
      console.error('[Cron] ❌ Error running payment expiration job:', error);
    }
  });
};

export default paymentExpirationJob;
