import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import router from "./routes/routes.js";
import cors from 'cors'
import DBConnection from "./database/db.js";
const app = express();
app.use(cors());
app.use('/',router);

const PORT = process.env.PORT;
DBConnection();
app.listen(PORT, () => console.log(`running ${PORT}`));
 