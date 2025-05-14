import appointmentModel from "../Models/appointmentsModel.js";

export const appointments = async (req, res) => {
    try {
        const { id } = req.params;
        const today = new Date().toISOString().split("T")[0];
        console.log(today)
        const result = await appointmentModel.find({
            doctorId: id,
            date: { $gte: today },
            appointmentStatus:"Upcomming"
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching Appointments" });
    }
};