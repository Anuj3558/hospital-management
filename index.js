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
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
};

connectToDb('mongodb://mongo:ohxncbuViWzTGVLbUiTQbqzyhmHdcjXy@viaduct.proxy.rlwy.net:58397');
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
