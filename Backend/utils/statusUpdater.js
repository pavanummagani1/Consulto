import cron from 'node-cron';
import appointmentModel from '../Models/appointmentsModel.js';

console.log("hello...");
console.log("Scheduling cron job...");

cron.schedule('*/1 * * * *', async () => {
    const now = new Date();
    console.log("[CRON] Cron task started...");

    try {
        const expiredAppointments = await appointmentModel.find({
            appointmentStatus: { $ne: 'Completed' },
            appointmentEndTime: { $lt: now }
        });

        console.log(`[CRON] Found ${expiredAppointments.length} expired appointments`);

        if (expiredAppointments.length > 0) {
            const result = await appointmentModel.updateMany(
                {
                    appointmentStatus: { $ne: 'Completed' },
                    appointmentEndTime: { $lt: now }
                },
                { $set: { appointmentStatus: 'Completed' } }
            );

            console.log(`[CRON] Modified: ${result.modifiedCount}`);
        }
    } catch (error) {
        console.error('[CRON ERROR] Failed to update appointment statuses:', error);
    }
});
