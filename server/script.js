import * as dotenv from 'dotenv'
dotenv.config()
import DBConnection from "./database/db.js";
import File from "./modles/file.js";
import fs from 'fs'


async function deleteData(){
    DBConnection();
    const passDate=new Date(Date.now()-24*60*60*1000);
    const files=await File.find({createdAt:{$lt : passDate}});
    console.log(files)
    if(files.length){
        for(const file of files){
                try{
                    fs.unlinkSync(file.path);
                    console.log(file)
                    const name=file.filename
                    await file.deleteOne();
                    console.log(`successfully deleted ${name}`);
                }
                catch(err){
                    console.log(`Error while deleting file : ${err}`);
                }
        }
        console.log("Job done");
    }
}

deleteData().then(process.exit);