import { Router } from "express";
import multer from 'multer';
import jwt from 'jsonwebtoken';
import path from 'path';
import { handleAuth, handleBookApt, handleLogin, handleRegister, HandleAdmin, cancelAppointment, getUserAppointments } from "../controllers/userController.js";
import User from "../model/userModel.js";
import { aptDoc, Appointment } from "../model/AppointmetnModel.js";
import twilio from "twilio";
import nodemailer from 'nodemailer';

// Twilio setup


// Nodemailer setup


// JWT secret key
const privateKey = "$$11";

// Create Express Router
const UserRouter = Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define routes
UserRouter.post("/register", handleRegister);
UserRouter.post("/login", handleLogin);
UserRouter.route("/bookapt")
  
  .post(handleBookApt);
UserRouter.route("/admin")
  .get(HandleAdmin);
UserRouter.post("/auth",handleAuth);
// Update appointment status to 'Scheduled' and notify via SMS and Email
UserRouter.put('/admin/:id/schedule', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Scheduled' }, { new: true });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    // Notify via SMS


    // Notify via Email
    const mailOptions = {
      from: 'anujmahadik63@gmail.com',
      to: appointment.email,
      subject: 'Appointment Scheduled',
      text: `Patient Name:${appointment.patientName}\n
             Reason: ${appointment.reason}\n
            Appointment Date:${appointment.appointmentDate}\n
            Status: ${appointment.status}\n
            Phone No: ${appointment.phoneNo}\n
            Email: ${appointment.email}\n
            Address: ${appointment.address}\n
            Gender: ${appointment.gender}\n
            Blood Group: ${appointment.bloodGroup}\n
            Occupation: ${appointment.occupation}\n
            Insurance Policy No: ${appointment.insurancePolicyNo}\n
            Medical History: ${appointment.medicalHistory}\n
            Current Medication: ${appointment.currentMedication}\n
            Emergency Contact: ${appointment.emergencyContact}\n`
    };
    mail.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(appointment);
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(500).json({ error: 'Internal server error'+error });
  }
});

// Cancel appointment and notify via SMS and Email
UserRouter.put('/admin/:id/cancel', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Canceled' }, { new: true });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    // Notify via SMS


    // Notify via Email
    const mailOptions = {
      from: 'anujmahadik63@gmail.com',
      to: appointment.email,
      subject: 'Appointment Canceled',
      text: `Patient Name:${appointment.patientName}\n
             Reason: ${appointment.reason}\n
            Appointment Date:${appointment.appointmentDate}\n
            Status: ${appointment.status}\n
            Phone No: ${appointment.phoneNo}\n
            Email: ${appointment.email}\n
            Address: ${appointment.address}\n
            Gender: ${appointment.gender}\n
            Blood Group: ${appointment.bloodGroup}\n
            Occupation: ${appointment.occupation}\n
            Insurance Policy No: ${appointment.insurancePolicyNo}\n
            Medical History: ${appointment.medicalHistory}\n
            Current Medication: ${appointment.currentMedication}\n
            Emergency Contact: ${appointment.emergencyContact}\n`
    };
    mail.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(appointment);
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload a document for an appointment
UserRouter.post("/upload", async (req, res) => {


  try {
    return res.status(200).json({ message: 'File uploaded successfully'});
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

UserRouter.get('/my-appointments', getUserAppointments);

export default UserRouter;
