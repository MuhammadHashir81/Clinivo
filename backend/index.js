import express from 'express';
import { connectDB } from './config/db.js';
import { signUp } from './controllers/auth.controller.js';
import { configDotenv } from 'dotenv';
import cors from 'cors'
import { authRouter } from './routes/auth.route.js';


const app = express();

app.use(express.json())
configDotenv()

const port = process.env.PORT;

const apiUrl = process.env.API_URL


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

app.listen(port, () => {
  console.log(`Clinivo is listening on port ${port}`);
});