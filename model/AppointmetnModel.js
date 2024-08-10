import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema({
    patientName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    emergencyContact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    insurancePolicyNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    medicalHistory: {
        type: String,
        required: true,
    },
    bookedBy: {
        type: String,
        required: true,
    },
    currentMedication: {
        type: String,
        required: true,
    },
    status: { type: String, default: 'Pending' }

});
const aptDocschema = new Schema({
    docName:{type:String,required:true},
    email:{type:String,required:true},
    url:{type:String,required:true}
})
const aptDoc=model("AptDoc",aptDocschema);
const Appointment = model('Appointment', AppointmentSchema);

export {Appointment,aptDoc};
