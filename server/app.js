import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import router from "./routes/routes.js";
import cors from 'cors'
import DBConnection from "./database/db.js";
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/',router);
app.set('view engine', 'ejs');

const PORT = process.env.PORT;
DBConnection();
app.listen(PORT, () => console.log(`running ${PORT}`));
 