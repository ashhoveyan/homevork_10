import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/userRoute.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", routes)
app.use("/tasks", routes)

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});