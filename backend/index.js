import express from 'express';
import { connectDB } from './config/db.js';
import { configDotenv } from 'dotenv';
import cors from 'cors'
import { authRouter } from './routes/user.auth.route.js';
import { adminRouter } from './routes/admin.route.js';
import { staffRouter } from './routes/admin.staff.route.js';
import { doctorRouter } from './routes/doctor.route.js';
import cookieParser from "cookie-parser";
import { clinicRouter } from './routes/clinic.route.js';
import { receptionistRouter } from './routes/receptionist.route.js';

const app = express();

app.use(express.json())
configDotenv()

const port = process.env.PORT;

const apiUrl = process.env.API_URL

app.use(cookieParser());

const corsOptions = {
   origin: apiUrl,
   credentials: true,

}
app.use(cors(corsOptions))
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth',authRouter)
app.use('/admin',adminRouter)
app.use('/staff',staffRouter)
app.use('/clinic',clinicRouter)
app.use('/doctor',doctorRouter)
app.use('/receptionist',receptionistRouter)
app.listen(port, () => {
  console.log(`Clinivo is listening on port ${port}`);
});