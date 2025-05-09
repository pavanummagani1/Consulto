import appointmentModel from "../Models/appointmentsModel.js";

export const appointments = async (req, res) => {
    try {
        const { id } = req.params;
        const yesterday = new Date().toISOString().split("T")[0];
        const result = await appointmentModel.find({
            doctorId: id,
            date: { $gt: yesterday }
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching Appointments" });
    }
};