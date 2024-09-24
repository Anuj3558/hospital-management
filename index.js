import express from 'express';
import connectToDb from './connection.js';
import cookieParser from 'cookie-parser';
import UserRouter from './Routes/userRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from "path"
const app = express();
const port = 3001;

const corsOptions = {
  origin: 'https://hospitalmanagement-client.vercel.app/', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
};

connectToDb('mongodb://anujloharkar3557:3558@cluster0-shard-00-00.putip.mongodb.net:27017,cluster0-shard-00-01.putip.mongodb.net:27017,cluster0-shard-00-02.putip.mongodb.net:27017/HospitalMangement?ssl=true&replicaSet=atlas-6dcgli-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
app.use('/uploads', express.static(path.resolve("./uploads")));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', UserRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
