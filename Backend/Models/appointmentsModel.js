import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    consultingDoctor: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    bookedSlot: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        default: "Confirmed",
        enum: ["Confirmed", "Cancelled", "Completed"]
    },
    paymentType: {
        type: String,
        default: 'UPI'
    },
    paymentStatus: {
        type: String,
        default: 'Success'
    },
    speciality: {
        type: String
    },
    image: {
        type: String
    },
    appointmentStatus: {
        type: String,
        default: 'Upcoming',
        enum: ["Upcoming", "Today", "Completed", "Cancelled"]
    },
    doctorId: {
        type: String,
        required: true
    },
    appointmentid: {
        type: String,
        required: true,
        unique: true
    },
    // New fields for telemedicine integration
    meetUrl: {
        type: String,
        required: function() {
            return this.bookingStatus === "Confirmed";
        }
    },
    meetRoomName: {
        type: String,
        required: true,
        unique: true
    },
    appointmentStartTime: {
        type: Date,
        required: true
    },
    appointmentEndTime: {
        type: Date,
        required: true
    },
    consultationDuration: {
        type: Number,
        default: 45, // minutes
        min: 30,
        max: 60
    },
    joinInstructions: {
        type: String,
        default: "Click the meet link at your scheduled time. Ensure you have a stable internet connection, microphone, and camera ready."
    },
    recordingConsent: {
        type: Boolean,
        default: false
    },
    recordingUrl: {
        type: String
    }
}, { 
    minimize: false,
    timestamps: true 
});

// Add index for better query performance
appointmentSchema.index({ appointmentStartTime: 1 });
appointmentSchema.index({ meetRoomName: 1 }, { unique: true });

const appointmentModel = mongoose.models.appointments || mongoose.model('appointments', appointmentSchema);

export default appointmentModel;