import cron from 'node-cron';
import appointmentModel from '../Models/appointmentsModel.js'; 

cron.schedule('*/5 * * * *', async () => {
    const now = new Date();
    try {
        const result = await appointmentModel.updateMany(
            {
                appointmentStatus: { $ne: 'Completed' },
                appointmentEndTime: { $lt: now }
            },
            { $set: { appointmentStatus: 'Completed' } }
        );

        if (result.modifiedCount > 0) {
            console.log(`[CRON] ${result.modifiedCount} appointments marked as Completed.`);
        }
    } catch (error) {
        console.error('[CRON ERROR] Failed to update appointment statuses:', error);
    }
});
