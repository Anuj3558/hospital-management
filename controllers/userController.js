import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { Appointment, aptDoc } from "../model/AppointmetnModel.js";
import twilio from "twilio";

const saltRounds = 10;
const privateKey = "$$11"; 

// 
const accountSid = "ACa1b5b99f29831848cbd4071cef477b7b";
const authToken = "97cee9be5a5b331134d5e55d27e61ad4"
const client = new twilio(accountSid, authToken);
console.log(accountSid,authToken)
const handleRegister = async (req, res) => {
  try {
    const { name, email, phone, city, password } = req.body.formData;
    

    const hash = await bcrypt.hash(password, saltRounds);
    

    const user = await User.create({
      name,
      email,
      password: hash,
      city,
      phoneNo: phone
    });

    console.log(user);
    res.send("201");
  } catch (err) {
    console.error(err);
    res.send("500");
  }
};


const handleLogin = async (req, res) => {
    const { email, password } = req.body.formData;
    console.log(email, password);
    try {

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  

      const match = await bcrypt.compare(password, user.password);
      if (match) {

        const isAdmin = email === 'anujloharkar3557@gmail.com';
        const tokenPayload = { email, userId: user._id, isAdmin };
        const token = jwt.sign(tokenPayload, privateKey, { algorithm: 'HS256' });
        console.log(token);
        res.status(200).json({
          code: 200,
          token,
          isAdmin,
        });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
const handleAuth = async (req, res) => {
  const token = req.body.cookie;
  
  if (!token) {
    return res.send({ message: "Error" });
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    const user = await User.findOne({ email: decoded.email });
    if (user) {
      res.send({
        message: "Success",
        user
      });
    } else {
      res.send({ message: "Error" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Error" });
  }
};

const handleBookApt = async (req, res) => {
  const {
    name,
    email,
    phone,
    gender,
    emergencyContact,
    address,
    occupation,
    appointmentDate,
    reason,
    insurancePolicy,
    bloodGroup,
    medicalHistory,
    currentMedication,
    documentType,
  } = req.body;

  try {
  
    if(true)
    {
    
   
   
    const Appointmentdata = await Appointment.create({
      patientName: name,
      email: email,
      phoneNo: phone,
      gender: gender,
      emergencyContact: emergencyContact,
      address: address,
      occupation: occupation,
      appointmentDate: appointmentDate,
      reason: reason,
      bookedBy:email,
      insurancePolicyNo: insurancePolicy,
      bloodGroup: bloodGroup,
      medicalHistory: medicalHistory,
      currentMedication: currentMedication,
      documentType: documentType, 
    });

    console.log(Appointmentdata);
  
    
    // await client.messages.create({
    //   body: `New Appointment ${name} on ${appointmentDate}.`,
    //   to: '+918010546419',  
    //   from: '+15415694922' 
    // });
 
    res.status(200).json({ message: 'Appointment booked successfully!', data: Appointmentdata });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while booking the appointment.', error: error});
  }
};
const HandleAdmin =async(req,res)=>{
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
 const getUserAppointments = async (req, res) => {
    try {
        const token = req.cookies._id;
        const decoded = jwt.verify(token, privateKey);
        const user = await User.findOne({ email: decoded.email });
        console.log(decoded);
        const appointments = await Appointment.find({ bookedBy:decoded.email });
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const cancelAppointment = async (req, res) => {
   
};
export {
  handleRegister,
  handleLogin,
  handleAuth,
  handleBookApt,
  HandleAdmin,
  getUserAppointments,
  cancelAppointment
};
